from sqlalchemy import text
from app.models import NewsletterRead, db
from datetime import timedelta

def update_max_streak(email, streak):
    """
    Updates the max_streak in the database if the current streak is higher.
    """
    latest_read = (
        NewsletterRead.query
        .filter_by(email=email)
        .order_by(NewsletterRead.timestamp.desc())
        .first()
    )

    if latest_read and (latest_read.max_streak is None or streak > latest_read.max_streak):
        latest_read.max_streak = streak
        db.session.commit()

def calculate_streak(email):
    """
    Calculates the current streak and the maximum streak for an email, considering that Sundays do not break the sequence.
    """
    reads = (
        NewsletterRead.query
        .filter_by(email=email)
        .order_by(NewsletterRead.timestamp.desc())
        .all()
    )

    if not reads:
        return {"streak": 0, "max_streak": 0}

    streak = 1
    previous_date = reads[0].timestamp.date()

    for read in reads[1:]:
        current_date = read.timestamp.date()
        delta_days = (previous_date - current_date).days

        if delta_days == 1:
            if current_date.weekday() != 6:
                streak += 1
        elif delta_days > 1:
            is_all_sundays = all(
                (current_date + timedelta(days=i)).weekday() == 6
                for i in range(1, delta_days)
            )
            if not is_all_sundays:
                break

        previous_date = current_date

    if previous_date.weekday() == 6: 
        streak -= 1

    max_streak_query = text("""
        SELECT COALESCE(MAX(max_streak), 0) AS max_streak
        FROM newsletter_read
        WHERE email = :email
    """)
    max_streak_result = db.session.execute(max_streak_query, {"email": email}).fetchone()
    max_streak = max_streak_result.max_streak

    if streak > max_streak:
        max_streak = streak
        update_max_streak(email, streak)

    return {"streak": streak, "max_streak": max_streak}
