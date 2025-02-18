from app.database import db

from sqlalchemy.orm import load_only
from app.models import NewsletterRead

def calculate_streak(email):
    reads = NewsletterRead.query.filter_by(email=email) \
        .order_by(NewsletterRead.timestamp.desc()).options(load_only("timestamp", "max_streak")).all()

    if not reads:
        return 0

    read_dates = {read.timestamp.date() for read in reads if read.timestamp.weekday() != 6}

    if not read_dates:
        return 0

    sorted_dates = sorted(read_dates, reverse=True)

    streak = 0
    prev_date = None

    for read_date in sorted_dates:
        if prev_date is None:
            streak = 1
            prev_date = read_date
            continue

        delta = (prev_date - read_date).days

        if delta == 1 or (delta == 2 and prev_date.weekday() == 0):
            streak += 1
        else:
            break

        prev_date = read_date

    # Garantindo que max_streak seja atualizado corretamente
    max_streak = max(streak, reads[0].max_streak or 0)

    if streak > 0 and max_streak > reads[0].max_streak:
        reads[0].max_streak = max_streak  # Atualiza apenas a entrada mais recente
        db.session.flush()  # Garante que os dados são preparados para commit
        db.session.commit()  # Persiste as alterações no banco
        db.session.refresh(reads[0])  # Garante que os dados lidos estão atualizados
        print(f"Novo Max Streak atualizado no banco: {reads[0].max_streak}")

    return streak
