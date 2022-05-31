import pytest

from api import app, db


@pytest.fixture
def test_app():
    app.config.from_object("tests.base.TestConfig")
    db.init_app(app)
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()
    return app

@pytest.fixture
def client(test_app):
    return test_app.test_client()
