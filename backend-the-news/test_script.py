from run import db, create_app
from app.models import NewsletterRead
from datetime import datetime
from app.utils import calculate_streak

# Inicializar a aplicação Flask
app = create_app()

# Teste para calcular o streak
def test_calculate_streak(email):
    with app.app_context():
        # Adicionar dados à tabela
        db.session.add(NewsletterRead(email=email, post_id='post_1', timestamp=datetime(2025, 2, 18, 10, 0)))
        db.session.flush()
        db.session.commit() 
        
        # Adicionar leituras simuladas (sem domingos)
        db.session.add(NewsletterRead(email=email, post_id='post_1', timestamp=datetime(2025, 2, 18, 10, 0)))
        db.session.add(NewsletterRead(email=email, post_id='post_2', timestamp=datetime(2025, 2, 19, 10, 0)))
        db.session.add(NewsletterRead(email=email, post_id='post_3', timestamp=datetime(2025, 2, 20, 10, 0)))
        db.session.flush()
        db.session.commit()

        # Executa o cálculo do streak
        streak = calculate_streak(email)
        print(f"Streak atual para {email}: {streak}")

        # Verificar se o max_streak foi atualizado corretamente
        latest_read = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).first()
        print(f"Max streak para {email}: {latest_read.max_streak}")

# Teste para um intervalo sem leituras
def test_streak_with_gap(email):
    with app.app_context():
        # Adicionar algumas leituras para o usuário
        db.session.add(NewsletterRead(email=email, post_id='post_1', timestamp=datetime(2025, 2, 18, 10, 0)))
        db.session.add(NewsletterRead(email=email, post_id='post_2', timestamp=datetime(2025, 2, 19, 10, 0)))
        db.session.flush()
        db.session.commit()

        # Adicionar um intervalo sem leituras (exemplo: final de semana)
        db.session.add(NewsletterRead(email=email, post_id='post_3', timestamp=datetime(2025, 2, 23, 10, 0)))
        db.session.flush()
        db.session.commit()

        # Executa o cálculo do streak
        streak = calculate_streak(email)
        print(f"Streak atual para {email}: {streak}")

# Teste para múltiplas leituras no mesmo dia
def test_multiple_reads_same_day(email):
    with app.app_context():
        # Adicionar múltiplas leituras no mesmo dia
        db.session.add(NewsletterRead(email=email, post_id='post_1', timestamp=datetime(2025, 2, 18, 10, 0)))
        db.session.add(NewsletterRead(email=email, post_id='post_2', timestamp=datetime(2025, 2, 18, 12, 0)))
        db.session.flush()
        db.session.commit()

        # Executa o cálculo do streak
        streak = calculate_streak(email)
        print(f"Streak atual para {email} com múltiplas leituras no mesmo dia: {streak}")

# Teste para leituras incluindo domingos
def test_reads_including_sundays(email):
    with app.app_context():
        # Adicionar leituras incluindo um domingo
        db.session.add(NewsletterRead(email=email, post_id='post_1', timestamp=datetime(2025, 2, 18, 10, 0)))  # Tuesday
        db.session.add(NewsletterRead(email=email, post_id='post_2', timestamp=datetime(2025, 2, 19, 10, 0)))  # Wednesday
        db.session.add(NewsletterRead(email=email, post_id='post_3', timestamp=datetime(2025, 2, 22, 10, 0)))  # Saturday
        db.session.add(NewsletterRead(email=email, post_id='post_4', timestamp=datetime(2025, 2, 23, 10, 0)))  # Sunday
        db.session.flush()
        db.session.commit()

        # Executa o cálculo do streak
        streak = calculate_streak(email)
        print(f"Streak atual para {email} incluindo domingos: {streak}")

# Teste sem leituras
def test_no_reads(email):
    with app.app_context():
        # Executa o cálculo do streak sem leituras
        streak = calculate_streak(email)
        print(f"Streak atual para {email} sem leituras: {streak}")

# Teste para leituras não consecutivas
def test_non_consecutive_reads(email):
    with app.app_context():
        # Adicionar leituras não consecutivas
        db.session.add(NewsletterRead(email=email, post_id='post_1', timestamp=datetime(2025, 2, 18, 10, 0)))  # Tuesday
        db.session.add(NewsletterRead(email=email, post_id='post_2', timestamp=datetime(2025, 2, 20, 10, 0)))  # Thursday
        db.session.flush()
        db.session.commit()

        # Executa o cálculo do streak
        streak = calculate_streak(email)
        print(f"Streak atual para {email} com leituras não consecutivas: {streak}")

# Chamadas de teste
test_calculate_streak('larissa@thenews.com')
test_streak_with_gap('larissa@thenews.com')
test_multiple_reads_same_day('larissa@thenews.com')
test_reads_including_sundays('larissa@thenews.com')
test_no_reads('larissa@thenews.com')
test_non_consecutive_reads('larissa@thenews.com')
