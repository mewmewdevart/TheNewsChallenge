from sqlalchemy import func, text
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

def update_max_streak(email, current_streak):
    latest_read = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).first()
    
    if latest_read:
        latest_read.max_streak = latest_read.max_streak or 0
        
        if current_streak > latest_read.max_streak:
            latest_read.max_streak = current_streak
            db.session.commit()

def calculate_streak(email):
    # Consulta SQL para calcular o streak diretamente no banco de dados
    query = text("""
        WITH ranked_dates AS (
            SELECT
                email,
                DATE(timestamp) AS read_date,
                ROW_NUMBER() OVER (PARTITION BY email ORDER BY timestamp DESC) AS rn
            FROM newsletter_read
            WHERE email = :email AND WEEKDAY(timestamp) != 6
        ),
        streaks AS (
            SELECT
                email,
                read_date,
                DATE_SUB(read_date, INTERVAL rn DAY) AS streak_group
            FROM ranked_dates
        )
        SELECT
            email,
            COUNT(*) AS streak
        FROM streaks
        GROUP BY email, streak_group
        ORDER BY streak DESC
        LIMIT 1;
    """)

    result = db.session.execute(query, {"email": email}).fetchone()
    streak = result.streak if result else 0

    update_max_streak(email, streak)
    return streak