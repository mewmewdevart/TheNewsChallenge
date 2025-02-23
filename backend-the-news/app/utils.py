from sqlalchemy import text
from app.models import NewsletterRead, db
from datetime import datetime, timedelta

def update_max_streak(email, streak):
    """
    Updates the user's max_streak in the database if the current streak is higher.
    """
    latest_read = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).first()
    
    if latest_read:
        latest_read.max_streak = latest_read.max_streak or 0
        
        if streak > latest_read.max_streak:
            latest_read.max_streak = streak
            db.session.commit()

def calculate_streak(email):
    """
    Calculates the current streak and max_streak for a given email, considering that Sundays do not break the streak.
    """
    # Fetch all user reads, ordered by date (most recent to oldest)
    reads = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).all()

    streak = 0
    previous_date = None

    for read in reads:
        current_date = read.timestamp.date() 

        if previous_date is None:
            streak = 1
        else:
            delta_days = (previous_date - current_date).days

            if delta_days == 1:
                streak += 1
            elif delta_days > 1:
                is_all_sundays = True
                for day in range(1, delta_days):
                    check_date = current_date + timedelta(days=day)
                    if check_date.weekday() != 6:  # 6 = Sunday
                        is_all_sundays = False
                        break

                if is_all_sundays:
                    streak += 1
                else:
                    break
            else:
                pass

        previous_date = current_date

    max_streak_query = text("""
        SELECT MAX(max_streak) AS max_streak
        FROM newsletter_read
        WHERE email = :email
    """)
    max_streak_result = db.session.execute(max_streak_query, {"email": email}).fetchone()
    max_streak = max_streak_result.max_streak if max_streak_result and max_streak_result.max_streak else 0

    if streak > max_streak:
        max_streak = streak
        update_max_streak(email, streak)

    return {"streak": streak, "max_streak": max_streak}