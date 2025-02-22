from flask import Flask, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from flask_compress import Compress
from config import Config
from app.routes import routes
from app.database import db
from sqlalchemy import text
from app.services import update_streaks
from app.routes import init_cache 

def create_app():
    app = Flask(__name__, template_folder="templates")
    app.config.from_object(Config)

    app.config['COMPRESS_ALGORITHM'] = 'gzip'
    app.config['COMPRESS_MIN_SIZE'] = 500
    app.config['COMPRESS_MIMETYPES'] = [
        'text/html',
        'text/css',
        'application/json',
        'application/javascript',
    ]
    Compress(app)

    db.init_app(app)

    migrate = Migrate(app, db)

    # Verificando a conexão com o banco de dados
    with app.app_context():
        try:
            db.session.execute(text('SELECT 1'))
            print("Database connection successful!")
        except Exception as e:
            print(f"Error connecting to the database: {e}")

    # Inicializando o CORS
    CORS(app, origins="*")

    # Registrando os blueprints
    app.register_blueprint(routes)

    # Inicializando o cache
    init_cache(app)

    @app.route('/documentation')
    def home():
        return render_template("index.html")

    return app

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        update_streaks()
    app.run(debug=True)
