from datetime import datetime, timedelta
from .models import NewsletterRead, db

def calculate_streak(email):
    """
    Calcula o streak de aberturas consecutivas de newsletters para um e-mail específico.
    """
    # Busca todas as aberturas do usuário, ordenadas por data (da mais recente para a mais antiga)
    reads = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).all()

    streak = 0
    if not reads:
        return streak

    for i in range(1, len(reads)):
        previous_read = reads[i - 1].timestamp
        current_read = reads[i].timestamp

        if (previous_read - current_read).days == 1:
            streak += 1
        else:
            break 

    return streak + 1 