from app.models import NewsletterRead, db
from .utils import calculate_streak

def update_streaks():
    """Updates the newsletter read streaks for all users in the database."""
    emails = db.session.query(NewsletterRead.email).distinct().all()

    for email in emails:
        email = email[0]
        streak = calculate_streak(email)

        NewsletterRead.query.filter_by(email=email).update({"current_streak": streak})

    db.session.commit()
    print("Streaks updated successfully!")