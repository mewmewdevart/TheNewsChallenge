from sqlalchemy import Column, Integer, String, DateTime, Index
from .database import db
import re
from sqlalchemy.orm import validates

class NewsletterRead(db.Model):
    __tablename__ = 'newsletter_read'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    post_id = db.Column(db.String(255), unique=True, nullable=False, index=True)
    utm_source = db.Column(db.String(50), nullable=False, default="")
    utm_medium = db.Column(db.String(50), nullable=False, default="")
    utm_campaign = db.Column(db.String(50), nullable=False, default="")
    utm_channel = db.Column(db.String(50), nullable=False, default="")
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp(), index=True)
    streak = db.Column(db.Integer, default=0)
    max_streak = db.Column(db.Integer, default=0)

    __table_args__ = (
        Index('ix_newsletter_read_email_timestamp', 'email', 'timestamp'),
    )

    @validates('email')
    def validate_email(self, key, address):
        if address is None or not re.match(r"[^@]+@[^@]+\.[^@]+", address):
            raise ValueError("Invalid email address")
        return address

    def custom_method(self):
        return "expected result"