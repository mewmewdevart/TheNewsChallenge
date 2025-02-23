from flask import Blueprint, request, jsonify
from .models import NewsletterRead, db
from datetime import datetime, timedelta
from sqlalchemy import func
from app.utils import calculate_streak, update_max_streak
import logging
from flask_caching import Cache
from sqlalchemy.exc import SQLAlchemyError

routes = Blueprint("routes", __name__)

cache = Cache()

def init_cache(app):
    cache.init_app(app, config={'CACHE_TYPE': 'SimpleCache'})

@routes.route('/', methods=['GET'])
def webhook():
    email = request.args.get('email')
    post_id = request.args.get('post_id')
    utm_source = request.args.get('utm_source', "")
    utm_medium = request.args.get('utm_medium', "")
    utm_campaign = request.args.get('utm_campaign', "")
    utm_channel = request.args.get('utm_channel', "")

    logging.info(f"Received: email={email}, post_id={post_id}, utm_source={utm_source}, utm_medium={utm_medium}, utm_campaign={utm_campaign}, utm_channel={utm_channel}")

    if not email or not post_id:
        return jsonify({"error": "Email and ID are required"}), 400

    # Calcula o streak e max_streak
    streak_data = calculate_streak(email)
    streak = streak_data["streak"]
    max_streak = streak_data["max_streak"]

    # Cria uma nova entrada no banco de dados
    new_read = NewsletterRead(
        email=email,
        post_id=post_id,
        utm_source=utm_source,
        utm_medium=utm_medium,
        utm_campaign=utm_campaign,
        utm_channel=utm_channel,
        streak=streak,
        max_streak=max_streak,
    )

    try:
        db.session.add(new_read)
        db.session.commit()
        return jsonify({"message": "Webhook received and saved successfully", "email": email, "id": post_id, "streak": streak, "max_streak": max_streak}), 200
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
        "timestamp": read.timestamp
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
@cache.cached(timeout=300)  # Cache com tempo de 5 minutos
def get_top_readers():
    try:
        top_readers = (
            db.session.query(NewsletterRead.email, func.count(NewsletterRead.id).label('reads'))
            .group_by(NewsletterRead.email)
            .order_by(func.count(NewsletterRead.id).desc())
            .limit(10)
            .all()
        )
        readers_data = [{"email": reader.email, "reads": reader.reads} for reader in top_readers]
        return jsonify(readers_data), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

@routes.route('/streak', methods=['GET'])
def get_streak():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400

    streak_data = calculate_streak(email)
    return jsonify({"email": email, "streak": streak_data["streak"], "max_streak": streak_data["max_streak"]}), 200

@routes.route('/history', methods=['GET'])
def get_history():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400

    history = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).all()
    history_data = [{
        "post_id": entry.post_id,
        "timestamp": entry.timestamp
    } for entry in history]

    return jsonify(history_data), 200

@routes.route('/check-email', methods=['GET'])
def check_email():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = NewsletterRead.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "Email not registered."}), 404

    return jsonify({"message": "Email found", "email": email}), 200

@routes.route('/max-streak', methods=['GET'])
def get_max_streak():
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400

    max_streak = db.session.query(func.max(NewsletterRead.max_streak)).filter_by(email=email).scalar()

    return jsonify({"email": email, "max_streak": max_streak or 0}), 200