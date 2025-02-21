from app.models import NewsletterRead
from app.database import db
from datetime import datetime

def update_max_streak(email, current_streak):
    latest_read = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).first()
    
    print(f"Última leitura para {email}: {latest_read}")  # Debug
    
    if latest_read:
        latest_read.max_streak = latest_read.max_streak or 0
        print(f"Max streak antes da atualização: {latest_read.max_streak}")  # Debug
        
        if current_streak > latest_read.max_streak:
            latest_read.max_streak = current_streak
            print(f"Max streak atualizado para: {latest_read.max_streak}")  # Debug
            db.session.flush()
            db.session.commit()
        else:
            print("O current_streak não é maior que o max_streak atual.")  # Debug


def calculate_streak(email):
    reads = (
        db.session.query(NewsletterRead)
        .filter(NewsletterRead.email == email)
        .all()
    )
    filtered_reads = [read for read in reads if read.timestamp.weekday() != 6]

    print(f"Ler leituras para {email}: {filtered_reads}")  # Debug

    if not filtered_reads:
        return 0  # Nenhuma leitura, streak é 0

    read_dates = {read.timestamp.date() for read in filtered_reads}
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

    print(f"Streak calculado: {streak}")  # Debug

    update_max_streak(email, streak)

    return streak
