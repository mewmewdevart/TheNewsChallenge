# run.py
from flask import Flask, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from sqlalchemy import text
from config import Config
from app.routes import routes
from app.database import db

def create_app():
    app = Flask(__name__, template_folder="templates")
    app.config.from_object(Config)

    db.init_app(app)
    Migrate(app, db)

    # Database Connection Test
    with app.app_context():
        try:
            db.session.execute(text('SELECT 1')) 
            print("Database connection successful!")
        except Exception as e:
            print(f"Error connecting to the database: {e}")

    CORS(app, origins=["http://localhost:5173"])

    app.register_blueprint(routes)

    @app.route('/')
    def home():
        return render_template("index.html")

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
