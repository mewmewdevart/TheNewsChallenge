from flask import Flask
from .routes import routes
from .database import db  

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    db.init_app(app)
    app.register_blueprint(routes)
    
    return app