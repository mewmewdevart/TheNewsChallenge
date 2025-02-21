from flask import Blueprint, request, jsonify
from .models import NewsletterRead, db
from datetime import datetime
from sqlalchemy import func
from app.utils import calculate_streak
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

    streak = calculate_streak(email)
    max_streak = db.session.query(func.max(NewsletterRead.streak)).filter_by(email=email).scalar() or 0
    max_streak = max(max_streak, streak)

    new_read = NewsletterRead(
        email=email,
        post_id=post_id,
        utm_source=utm_source,
        utm_medium=utm_medium,
        utm_campaign=utm_campaign,
        utm_channel=utm_channel,
        streak=streak,
        max_streak=max_streak
    )

    try:
        db.session.add(new_read)
        db.session.commit()
        return jsonify({"message": "Webhook recebido e salvo com sucesso", "email": email, "id": post_id}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@routes.route('/max-streak', methods=['GET'])
def get_max_streak():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email é obrigatório"}), 400

    max_streak = db.session.query(func.max(NewsletterRead.max_streak)).filter_by(email=email).scalar()

    return jsonify({"email": email, "max_streak": max_streak or 0}), 200
