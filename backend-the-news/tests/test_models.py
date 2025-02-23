import pytest
from sqlalchemy.exc import IntegrityError
from app.models import NewsletterRead, db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask import Flask

@pytest.fixture
def app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def session(app):
    with app.app_context():
        yield db.session

def test_create_newsletter_read(session):
    """Testa se um novo registro é criado corretamente."""
    new_entry = NewsletterRead(
        email="test@example.com",
        post_id="12345",
        utm_source="google",
        utm_medium="email",
        utm_campaign="campaign1",
        utm_channel="social"
    )

    session.add(new_entry)
    session.commit()

    retrieved_entry = session.query(NewsletterRead).filter_by(email="test@example.com").first()

    assert retrieved_entry is not None
    assert retrieved_entry.email == "test@example.com"
    assert retrieved_entry.post_id == "12345"
    assert retrieved_entry.utm_source == "google"
    assert retrieved_entry.utm_medium == "email"
    assert retrieved_entry.utm_campaign == "campaign1"
    assert retrieved_entry.utm_channel == "social"
    assert retrieved_entry.streak == 0  # Default
    assert retrieved_entry.max_streak == 0  # Default

def test_newsletter_read_defaults(session):
    new_entry = NewsletterRead(
        email="default@example.com",
        post_id="11111",
        utm_source="source",
        utm_medium="medium",
        utm_campaign="campaign",
        utm_channel="channel"
    )

    session.add(new_entry)
    session.commit()

    retrieved_entry = session.query(NewsletterRead).filter_by(email="default@example.com").first()
    assert retrieved_entry.streak == 0
    assert retrieved_entry.max_streak == 0

def test_newsletter_read_constraints(session):
    new_entry = NewsletterRead(
        email="constraint@example.com",
        post_id="22222",
        utm_source="source",
        utm_medium="medium",
        utm_campaign="campaign",
        utm_channel="channel"
    )

    session.add(new_entry)
    session.commit()

    with pytest.raises(IntegrityError):
        duplicate_entry = NewsletterRead(
            email="constraint@example.com",
            post_id="22222",
            utm_source="source",
            utm_medium="medium",
            utm_campaign="campaign",
            utm_channel="channel"
        )
        session.add(duplicate_entry)
        session.commit()
