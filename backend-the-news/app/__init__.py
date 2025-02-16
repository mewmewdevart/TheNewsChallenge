from flask import Flask
from .routes import routes
from .database import db  # Importe o db

def create_app():
    app = Flask(__name__)

    # Carregue as configurações do arquivo config.py
    app.config.from_object('config.Config')

    # Inicialize o db com o app
    db.init_app(app)

    # Registre o blueprint
    app.register_blueprint(routes)
    
    return app