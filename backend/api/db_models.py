from datetime import datetime

from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

from .utils import deserialize_datetime

db = SQLAlchemy()


class BaseModel():
    def save(self):
        db.session.add(self)
        db.session.commit()


class User(db.Model, BaseModel):
    """
    Stores information about a user
    """
    __tablename__ = "user"

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(32), nullable=False, unique=True)
    email = db.Column(db.String(64), nullable=False, unique=True)
    password = db.Column(db.Text())
    is_token_active = db.Column(db.Boolean())
    metrics = db.relationship("Metric", backref="user", lazy="dynamic")
    create_date = db.Column(db.DateTime(), default=datetime.utcnow())

    def __repr__(self):
        return "<User %r>" % self.username

    def set_password(self, password):
        self.password = generate_password_hash(password)
        self.save()

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def set_token_active(self, set_status):
        self.is_token_active = set_status
        self.save()

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def to_json(self):

        _dict = {}
        _dict["id"] = self.id
        _dict["username"] = self.username
        _dict["email"] = self.email

        return _dict


class BlockedToken(db.Model, BaseModel):
    """
    Stores token/invalid tokens to prevent them from being used
    """
    __tablename__ = "blocked_tokens"

    id = db.Column(db.Integer(), primary_key=True)
    token = db.Column(db.String(), nullable=False)
    create_date = db.Column(db.DateTime(), default=datetime.utcnow())

    def __repr__(self):
        return "<Token %r>" % self.token


class Metric(db.Model, BaseModel):
    """
    Stores metrics created by users
    """
    __tablename__ = "metrics"

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    value = db.Column(db.Integer(), nullable=False)
    time_stamp = db.Column(db.DateTime(), default=datetime.utcnow())
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return "<Metric %r>" % self.name

    def to_json(self):

        _dict = {}
        _dict["id"] = self.id
        _dict["name"] = self.name
        _dict["value"] = self.value
        _dict["time_stamp"] = deserialize_datetime(self.time_stamp)

        return _dict
