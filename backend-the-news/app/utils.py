from app import db
from app.models import NewsletterRead
from sqlalchemy.sql import func

def update_streak(email):
    user_records = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp).all()
    
    if not user_records:
        return {"error": "Usuário não encontrado"}

    current_streak = 0
    max_streak = 0
    last_date = None

    for record in user_records:
        if last_date and (record.timestamp.date() - last_date).days == 1:
            current_streak += 1
        else:
            current_streak = 1  # Reseta se não for consecutivo

        max_streak = max(max_streak, current_streak)
        last_date = record.timestamp.date()

    # Atualiza todos os registros do usuário com o novo max_streak
    db.session.query(NewsletterRead).filter_by(email=email).update({"max_streak": max_streak})
    db.session.commit()
