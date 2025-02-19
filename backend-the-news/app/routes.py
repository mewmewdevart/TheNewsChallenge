from flask import Blueprint, request, jsonify
from .models import NewsletterRead, db
from datetime import datetime, timedelta
from sqlalchemy import func
from .utils import calculate_streak
import logging

routes = Blueprint("routes", __name__)

@routes.route('/', methods=['GET'])
def webhook():
    email = request.args.get('email')
    post_id = request.args.get('id')
    utm_source = request.args.get('utm_source', "")
    utm_medium = request.args.get('utm_medium', "")
    utm_campaign = request.args.get('utm_campaign', "")
    utm_channel = request.args.get('utm_channel', "")

    logging.info(f"Recebido: email={email}, post_id={post_id}, utm_source={utm_source}, utm_medium={utm_medium}, utm_campaign={utm_campaign}, utm_channel={utm_channel}")

    if not email or not post_id:
        return jsonify({"error": "Email e ID são obrigatórios"}), 400

    # Calcula o streak e o max_streak
    streak, max_streak = calculate_streak(email)

    # Cria uma nova leitura
    new_read = NewsletterRead(
        email=email,
        post_id=post_id,
        utm_source=utm_source,
        utm_medium=utm_medium,
        utm_campaign=utm_campaign,
        utm_channel=utm_channel,
        streak=streak,
        max_streak=max_streak  # Adiciona o max_streak ao novo registro
    )

    try:
        db.session.add(new_read)
        db.session.commit()
        return jsonify({"message": "Webhook recebido e salvo com sucesso", "email": email, "id": post_id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@routes.route('/reads', methods=['GET'])
def list_reads():
    reads = NewsletterRead.query.all()
    reads_data = [{
        "id": read.id,
        "email": read.email,
        "post_id": read.post_id,
        "utm_source": read.utm_source,
        "utm_medium": read.utm_medium,
        "utm_campaign": read.utm_campaign,
        "utm_channel": read.utm_channel,
        "timestamp": read.timestamp,
        "streak": read.streak,
        "max_streak": read.max_streak  # Adiciona o max_streak à resposta
    } for read in reads]
    return jsonify(reads_data), 200

@routes.route('/metrics', methods=['GET'])
def get_metrics():
    total_readers = db.session.query(func.count(func.distinct(NewsletterRead.email))).scalar()

    total_opens = db.session.query(func.count(NewsletterRead.id)).scalar()

    average_opens = total_opens / total_readers if total_readers > 0 else 0

    return jsonify({
        "total_readers": total_readers,
        "total_opens": total_opens,
        "average_opens": average_opens
    }), 200

@routes.route('/top-readers', methods=['GET'])
def get_top_readers():
    top_readers = db.session.query(
        NewsletterRead.email,
        func.max(NewsletterRead.streak).label('streak'),  # Streak atual
        func.max(NewsletterRead.max_streak).label('max_streak')  # Max streak
    ).group_by(NewsletterRead.email).order_by(func.max(NewsletterRead.streak).desc()).limit(10).all()

    # Formata os dados para a resposta
    readers_data = [
        {
            "email": reader.email,
            "streak": reader.streak,  # Streak atual
            "max_streak": reader.max_streak  # Max streak
        }
        for reader in top_readers
    ]

    return jsonify(readers_data), 200

@routes.route('/streak', methods=['GET'])
def get_streak():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email é obrigatório"}), 400

    # Obtém a última leitura do usuário
    last_read = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).first()

    if not last_read:
        return jsonify({"email": email, "streak": 0, "max_streak": 0}), 200

    return jsonify({"email": email, "streak": last_read.streak, "max_streak": last_read.max_streak}), 200

@routes.route('/history', methods=['GET'])
def get_history():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email é obrigatório"}), 400

    history = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).all()
    history_data = [{
        "post_id": entry.post_id,
        "timestamp": entry.timestamp,
        "streak": entry.streak,
        "max_streak": entry.max_streak  # Adiciona o max_streak à resposta
    } for entry in history]

    return jsonify(history_data), 200

@routes.route('/check-email', methods=['GET'])
def check_email():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email é obrigatório"}), 400

    user = NewsletterRead.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "E-mail não cadastrado"}), 404

    return jsonify({"message": "E-mail encontrado", "email": email}), 200