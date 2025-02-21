from app.models import NewsletterRead

def update_max_streak(email, current_streak):
    """
    Atualiza o max_streak do usuário se o current_streak for maior que o max_streak atual.
    """
    # Busca o registro mais recente do usuário
    latest_read = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).first()

    if latest_read:
        # Se o current_streak for maior que o max_streak, atualiza o max_streak
        if current_streak > latest_read.max_streak:
            latest_read.max_streak = current_streak
            db.session.commit()

def calculate_streak(email):
    """
    Calcula o streak de leituras consecutivas de newsletters para um e-mail específico.
    Ignora domingos e múltiplas leituras no mesmo dia.
    """
    reads = NewsletterRead.query.filter_by(email=email) \
        .order_by(NewsletterRead.timestamp.desc()).all()

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
            streak = 1
            prev_date = read_date
            continue

        delta = (prev_date - read_date).days

        # Verifica se os dias são consecutivos, ignorando domingos
        if delta == 1:  # Dias consecutivos (segunda a sábado)
            streak += 1
        elif delta == 2 and prev_date.weekday() == 0:  # Segunda-feira após sábado
            streak += 1
        else:
            break  # Interrompe o streak

        prev_date = read_date

    # Atualiza o max_streak se necessário
    update_max_streak(email, streak)

    return streak