import os
from flask import Flask, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config
from app.routes import routes
from app.models import db

def create_app():
    app = Flask(__name__, template_folder="templates")
    app.config.from_object(Config)
    
    db.init_app(app)
    
    CORS(app, origins=["http://localhost:5173"])
    
    app.register_blueprint(routes)

    @app.route('/')
    def home():
        return render_template("index.html")

    return app

app = create_app()

db_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'newsletter_streaks.db')
if not os.path.exists(db_path):
    with app.app_context():
        db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
