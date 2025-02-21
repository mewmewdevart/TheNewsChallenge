from app.models import NewsletterRead, db
from .utils import calculate_streak

def update_streaks():
    """Atualiza os streaks de leitura da newsletter para todos os usuários no banco de dados."""
    emails = db.session.query(NewsletterRead.email).distinct().all()

    for email in emails:
        email = email[0]  # Extrai o e-mail da tupla
        streak = calculate_streak(email)

        # Atualiza o streak para todas as leituras do e-mail
        NewsletterRead.query.filter_by(email=email).update({"streak": streak})

    db.session.commit()
    print("Streaks atualizados com sucesso!")
