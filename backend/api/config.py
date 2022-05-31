import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))


class BaseConfig():

    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL") or 'sqlite:///' + os.path.join(BASE_DIR, "backend.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS", False)
    SECRET_KEY = os.getenv("SECRET_KEY", "random_secret_key")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "random_jwt_secret_key")
    JWT_ACCESS_TOKEN_EXPIRES = os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600)
