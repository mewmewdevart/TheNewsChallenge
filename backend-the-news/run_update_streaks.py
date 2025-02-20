from app import create_app
from app.services import update_streaks

app = create_app()

with app.app_context():
    update_streaks()
