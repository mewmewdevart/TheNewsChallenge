from sqlalchemy import text
from app.models import NewsletterRead
from app.database import db
from datetime import datetime

def update_max_streak(email, current_streak):
    latest_read = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).first()
    
    if latest_read:
        latest_read.max_streak = latest_read.max_streak or 0
        
        if current_streak > latest_read.max_streak:
            latest_read.max_streak = current_streak
            db.session.commit()

def calculate_streak(email):
    query = text("""
        WITH ranked_dates AS (
            SELECT
                email,
                DATE(timestamp) AS read_date,
                ROW_NUMBER() OVER (PARTITION BY email ORDER BY timestamp DESC) AS rn
            FROM newsletter_read
            WHERE email = :email AND EXTRACT(DOW FROM timestamp) != 6
        ),
        streaks AS (
            SELECT
                email,
                read_date,
                read_date - (rn || ' days')::INTERVAL AS streak_group
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