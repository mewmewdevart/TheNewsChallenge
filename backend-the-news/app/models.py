from .database import db

class NewsletterRead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    post_id = db.Column(db.String(255), nullable=False)
    utm_source = db.Column(db.String(50))
    utm_medium = db.Column(db.String(50))
    utm_campaign = db.Column(db.String(50))
    utm_channel = db.Column(db.String(50))
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
