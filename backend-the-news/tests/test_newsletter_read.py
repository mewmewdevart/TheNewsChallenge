import pytest
from app.models import NewsletterRead
from sqlalchemy.exc import IntegrityError

def test_create_newsletter_read(session):
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
    assert retrieved_entry.current_streak == 0  # Default

def test_update_newsletter_read(session):
    new_entry = NewsletterRead(
        email="update@example.com",
        post_id="54321",
        utm_source="bing",
        utm_medium="social",
        utm_campaign="campaign2",
        utm_channel="email"
    )

    session.add(new_entry)
    session.commit()

    # Update the entry
    new_entry.utm_source = "updated_source"
    session.commit()

    retrieved_entry = session.query(NewsletterRead).filter_by(email="update@example.com").first()
    assert retrieved_entry.utm_source == "updated_source"

def test_delete_newsletter_read(session):
    new_entry = NewsletterRead(
        email="delete@example.com",
        post_id="67890",
        utm_source="yahoo",
        utm_medium="ad",
        utm_campaign="campaign3",
        utm_channel="web"
    )

    session.add(new_entry)
    session.commit()

    # Delete the entry
    session.delete(new_entry)
    session.commit()

    retrieved_entry = session.query(NewsletterRead).filter_by(email="delete@example.com").first()
    assert retrieved_entry is None

def test_invalid_email():
    """Testa se um ValueError é levantado para um email inválido."""
    with pytest.raises(ValueError, match="Invalid email address"):
        NewsletterRead(
            email="invalid-email",
            post_id="99999",
            utm_source="source",
            utm_medium="medium",
            utm_campaign="campaign",
            utm_channel="channel"
        )

def test_null_values():
    """Testa se um ValueError é levantado para valores nulos em campos obrigatórios."""
    with pytest.raises(ValueError, match="Invalid email address"):
        NewsletterRead(
            email=None,
            post_id=None,
            utm_source="source",
            utm_medium="medium",
            utm_campaign="campaign",
            utm_channel="channel"
        )

def test_empty_database(session):
    retrieved_entry = session.query(NewsletterRead).filter_by(email="nonexistent@example.com").first()
    assert retrieved_entry is None

def test_custom_method(session):
    new_entry = NewsletterRead(
        email="custom@example.com",
        post_id="33333",
        utm_source="source",
        utm_medium="medium",
        utm_campaign="campaign",
        utm_channel="channel"
    )
    session.add(new_entry)
    session.commit()
    result = new_entry.custom_method()
    assert result == "expected result"