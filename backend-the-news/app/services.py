from app.models import NewsletterRead, db
from app.utils import calculate_streak

def update_streaks():
    """Updates the newsletter read streaks for all users in the database."""
    emails = db.session.query(NewsletterRead.email).distinct().all()

    for email in emails:
        email = email[0]
        streak_data = calculate_streak(email)
        streak = streak_data['streak']
        max_streak = streak_data['max_streak']
        
        NewsletterRead.query.filter_by(email=email).update({"streak": streak, "max_streak": max_streak})
        db.session.commit()

    print("Streaks updated successfully!")