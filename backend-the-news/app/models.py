from sqlalchemy import Column, Integer, String, Text
from .database import db

class NewsletterRead(db.Model):
    __tablename__ = 'newsletter_read'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False, index=True)
    post_id = db.Column(db.String(255), nullable=False, index=True)
    utm_source = db.Column(db.String(50), nullable=False, default="")
    utm_medium = db.Column(db.String(50), nullable=False, default="")
    utm_campaign = db.Column(db.String(50), nullable=False, default="")
    utm_channel = db.Column(db.String(50), nullable=False, default="")
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    streak = db.Column(db.Integer, default=0)