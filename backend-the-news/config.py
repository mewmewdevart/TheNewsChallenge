import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///newsletter_streaks.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    WEBHOOK_URL = os.getenv('WEBHOOK_URL', 'http://localhost:5000/webhook')
    REGISTERED_EMAIL = os.getenv('REGISTERED_EMAIL', 'admin@waffle.com')
