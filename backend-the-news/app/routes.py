from flask import Blueprint, render_template, request, jsonify
from .models import db, NewsletterRead

routes = Blueprint("routes", __name__)

@routes.route('/')
def home():
    return render_template("index.html")

@routes.route("/webhook", methods=["GET"])
def webhook():
    email = request.args.get("email")
    post_id = request.args.get("post_id")
    utm_source = request.args.get("utm_source")
    utm_medium = request.args.get("utm_medium")
    utm_campaign = request.args.get("utm_campaign")
    utm_channel = request.args.get("utm_channel")

    if not email or not post_id:
        return jsonify({"error": "Email e post_id são obrigatórios"}), 400

    try:
        new_read = NewsletterRead(
            email=email,
            post_id=post_id,
            utm_source=utm_source,
            utm_medium=utm_medium,
            utm_campaign=utm_campaign,
            utm_channel=utm_channel
        )
        db.session.add(new_read)
        db.session.commit()
        return jsonify({"message": "Registro salvo com sucesso"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500