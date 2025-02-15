from app.database import create_app
from app.services import calculate_streak
from app.models import NewsletterRead, db
from datetime import datetime, timedelta


app = create_app()

with app.app_context():
    db.session.query(NewsletterRead).delete()
    db.session.commit()

    email = "usuario@example.com"
    today = datetime.now()
    yesterday = today - timedelta(days=1)
    two_days_ago = today - timedelta(days=2)

    db.session.add(NewsletterRead(email=email, post_id="post_1", timestamp=two_days_ago))
    db.session.add(NewsletterRead(email=email, post_id="post_2", timestamp=yesterday))
    db.session.add(NewsletterRead(email=email, post_id="post_3", timestamp=today))
    db.session.commit()

    streak = calculate_streak(email)
    print(f"Streak para {email}: {streak}")  # Deve imprimir "Streak para usuario@example.com: 3"