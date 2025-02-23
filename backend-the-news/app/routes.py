from flask import Blueprint, request, jsonify
from .models import NewsletterRead, db
from datetime import datetime
from sqlalchemy import func
from app.utils import calculate_streak
import logging
from flask_caching import Cache
from sqlalchemy.exc import SQLAlchemyError

routes = Blueprint("routes", __name__)

cache = Cache()

def init_cache(app):
    cache.init_app(app, config={'CACHE_TYPE': 'SimpleCache'})

@routes.route('/', methods=['GET'])
def webhook():
    """
    Endpoint to register a new newsletter read.
    """
    email = request.args.get('email')
    post_id = request.args.get('post_id')
    utm_source = request.args.get('utm_source', "")
    utm_medium = request.args.get('utm_medium', "")
    utm_campaign = request.args.get('utm_campaign', "")
    utm_channel = request.args.get('utm_channel', "")

    logging.info(f"Received: email={email}, post_id={post_id}, utm_source={utm_source}, utm_medium={utm_medium}, utm_campaign={utm_campaign}, utm_channel={utm_channel}")

    if not email or not post_id:
        return jsonify({"error": "Email and ID are required"}), 400

    streak_data = calculate_streak(email)
    streak = streak_data.get("streak", 0)
    max_streak = streak_data.get("max_streak", 0)

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
        return jsonify({
            "message": "Webhook received and saved successfully",
            "email": email,
            "id": post_id,
            "streak": streak,
            "max_streak": max_streak
        }), 200
    except Exception as e:
        db.session.rollback()
        logging.error(f"Error saving new read: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@routes.route('/reads', methods=['GET'])
def list_reads():
    """
    Endpoint to list all registered reads.
    """
    try:
        reads = NewsletterRead.query.all()
        reads_data = [{
            "id": read.id,
            "email": read.email,
            "post_id": read.post_id,
            "utm_source": read.utm_source,
            "utm_medium": read.utm_medium,
            "utm_campaign": read.utm_campaign,
            "utm_channel": read.utm_channel,
            "timestamp": read.timestamp.isoformat() if read.timestamp else None,
            "streak": read.streak,
            "max_streak": read.max_streak
        } for read in reads]
        return jsonify(reads_data), 200
    except Exception as e:
        logging.error(f"Error fetching reads: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@routes.route('/metrics', methods=['GET'])
def get_metrics():
    """
    Endpoint to get general metrics.
    """
    try:
        total_readers = db.session.query(func.count(func.distinct(NewsletterRead.email))).scalar()
        total_opens = db.session.query(func.count(NewsletterRead.id)).scalar()
        average_opens = total_opens / total_readers if total_readers > 0 else 0

        return jsonify({
            "total_readers": total_readers,
            "total_opens": total_opens,
            "average_opens": average_opens
        }), 200
    except Exception as e:
        logging.error(f"Error fetching metrics: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@routes.route('/top-readers', methods=['GET'])
@cache.cached(timeout=300)
def get_top_readers():
    """
    Endpoint to get the top readers.
    """
    try:
        top_readers = (
            db.session.query(
                NewsletterRead.email,
                func.count(NewsletterRead.id).label('reads')
            )
            .group_by(NewsletterRead.email)
            .order_by(func.count(NewsletterRead.id).desc())
            .limit(10)
            .all()
        )
        
        readers_data = []
        for reader in top_readers:
            streak_data = calculate_streak(reader.email)
            readers_data.append({
                "email": reader.email,
                "reads": reader.reads,
                "streak": streak_data.get("streak", 0),
                "max_streak": streak_data.get("max_streak", 0)
            })
        
        return jsonify(readers_data), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        logging.error(f"Database error fetching top readers: {str(e)}")
        return jsonify({"error": "Database error"}), 500
    except Exception as e:
        logging.error(f"Unexpected error fetching top readers: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@routes.route('/streak', methods=['GET'])
def get_streak():
    """
    Endpoint to get the streak of a specific user.
    """
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        streak_data = calculate_streak(email)
        return jsonify({
            "email": email,
            "streak": streak_data.get("streak", 0),
            "max_streak": streak_data.get("max_streak", 0)
        }), 200
    except Exception as e:
        logging.error(f"Error fetching streak: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@routes.route('/history', methods=['GET'])
def get_history():
    """
    Endpoint to get the reading history of a user.
    """
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        history = NewsletterRead.query.filter_by(email=email).order_by(NewsletterRead.timestamp.desc()).all()
        history_data = [{
            "post_id": entry.post_id,
            "timestamp": entry.timestamp.isoformat() if entry.timestamp else None,
            "streak": entry.streak,
            "max_streak": entry.max_streak
        } for entry in history]
        return jsonify(history_data), 200
    except Exception as e:
        logging.error(f"Error fetching history: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@routes.route('/check-email', methods=['GET'])
def check_email():
    """
    Endpoint to check if an email is registered.
    """
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        user = NewsletterRead.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "Email not registered."}), 404
        return jsonify({"message": "Email found", "email": email}), 200
    except Exception as e:
        logging.error(f"Error checking email: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@routes.route('/max-streak', methods=['GET'])
def get_max_streak():
    """
    Endpoint to get the highest streak of a user.
    """
    email = request.args.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        max_streak = db.session.query(func.max(NewsletterRead.max_streak)).filter_by(email=email).scalar()
        return jsonify({"email": email, "max_streak": max_streak or 0}), 200
    except Exception as e:
        logging.error(f"Error fetching max streak: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500