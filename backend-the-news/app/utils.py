from app.database import db
from sqlalchemy.orm import load_only
from app.models import NewsletterRead

def calculate_streak(email):
    # Obtém leituras ordenadas do mais recente para o mais antigo
    reads = NewsletterRead.query.filter_by(email=email) \
        .order_by(NewsletterRead.timestamp.desc()).options(load_only("timestamp", "max_streak")).all()

    if not reads:
        return 0  # Nenhuma leitura, streak é 0

    # Conjunto para armazenar apenas as datas lidas (sem duplicação e ignorando domingos)
    read_dates = {read.timestamp.date() for read in reads if read.timestamp.weekday() != 6}

    if not read_dates:
        return 0  # Caso todas as leituras sejam domingos, retorna 0

    # Ordena as datas do mais recente para o mais antigo
    sorted_dates = sorted(read_dates, reverse=True)

    # Inicializa o streak
    streak = 0
    prev_date = None

    # Itera sobre as datas para verificar sequência
    for read_date in sorted_dates:
        if prev_date is None:
            # Primeira leitura válida (não domingo)
            streak = 1
            prev_date = read_date
            continue

        delta = (prev_date - read_date).days

        # Verifica se os dias são consecutivos, ignorando domingos
        if delta == 1 or (delta == 2 and prev_date.weekday() == 0):  # Segunda-feira após sábado
            streak += 1
        else:
            break  # Interrompe o streak

        prev_date = read_date

    # Calcula o novo max_streak
    current_max_streak = reads[0].max_streak or 0
    new_max_streak = max(streak, current_max_streak)

    # Atualiza o max_streak para todas as leituras do usuário se o streak atual for maior que o max_streak armazenado
    if streak > current_max_streak:
        for read in reads:
            read.max_streak = new_max_streak
        db.session.commit()  # Persiste as alterações no banco de dados
        print(f"Novo Max Streak atualizado no banco: {new_max_streak}")

    return streak