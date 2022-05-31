from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from .routes import rest_api
from .db_models import db

load_dotenv()

app = Flask(__name__)

app.config.from_object('api.config.BaseConfig')

db.init_app(app)
rest_api.init_app(app)
CORS(app)

# Create database all tables
@app.before_first_request
def initialize_database():
    db.create_all()
