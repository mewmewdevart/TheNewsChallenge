from flask import Flask, render_template
from flask_cors import CORS
from flask_migrate import Migrate
from flask_compress import Compress
from config import Config
from app.routes import routes
from app.database import db
from sqlalchemy import text
from app.services import update_streaks

def create_app():
    app = Flask(__name__, template_folder="templates")
    app.config.from_object(Config)

    # Configuração do Flask-Compress
    app.config['COMPRESS_ALGORITHM'] = 'gzip'
    app.config['COMPRESS_MIN_SIZE'] = 500
    app.config['COMPRESS_MIMETYPES'] = [
        'text/html',
        'text/css',
        'application/json',
        'application/javascript',
    ]
    Compress(app)

    # Inicialize o banco de dados
    db.init_app(app)

    # Inicialize o Flask-Migrate
    migrate = Migrate(app, db)

    # Teste de conexão com o banco de dados
    with app.app_context():
        try:
            db.session.execute(text('SELECT 1'))
            print("Database connection successful!")
        except Exception as e:
            print(f"Error connecting to the database: {e}")

    # Configuração do CORS
    CORS(app, origins=["http://localhost:5173/", "https://the-news-letter-streaks.vercel.app", "https://thenewsletterstreakschallenge.onrender.com"])

    # Registro das rotas
    app.register_blueprint(routes)

    # Rota de documentação
    @app.route('/documentation')
    def home():
        return render_template("index.html")

    return app

# Cria a aplicação
app = create_app()

# Executa a aplicação
if __name__ == "__main__":
    with app.app_context():
        update_streaks()  # Atualiza os streaks antes de iniciar o servidor
    app.run(debug=True)