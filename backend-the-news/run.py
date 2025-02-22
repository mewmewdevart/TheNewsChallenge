from flask import Flask, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from app.routes import routes
from app.database import db
from sqlalchemy import text
from app.services import update_streaks

def create_app():
    app = Flask(__name__, template_folder="templates")
    app.config.from_object(Config)

    # Initialize the database
    db.init_app(app)

    # Initialize Flask-Migrate
    migrate = Migrate(app, db)

    # Database Connection Test
    with app.app_context():
        try:
            db.session.execute(text('SELECT 1'))
            print("Database connection successful!")
        except Exception as e:
            print(f"Error connecting to the database: {e}")

    CORS(app, origins=["http://localhost:5173/", "https://the-news-letter-streaks.vercel.app", "https://thenewsletterstreakschallenge.onrender.com"])

    app.register_blueprint(routes)

    @app.route('/documentation')
    def home():
        return render_template("index.html")

    return app

app = create_app()

if __name__ == "__main__":
    update_streaks()
    app.run(debug=True)