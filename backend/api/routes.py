from datetime import datetime, timezone, timedelta
import jwt

from flask import request
from flask_restx import Resource

from .db_models import User, BlockedToken, Metric
from .config import BaseConfig
from .utils import get_paginate_context, authentication_required
from .restx_models import (
    signup_model,
    login_model,
    metric_model,
    rest_api,
)


# TODO: Add logging

@rest_api.route("/api/users/signup")
class SignUp(Resource):
    """
    Creates a new user object
    """

    @rest_api.expect(signup_model, validate=True)
    def post(self):

        request_data = request.get_json()

        _username = request_data.get("username")
        _email = request_data.get("email")
        _password = request_data.get("password")

        user_exists = User.get_by_email(_email)
        if user_exists:
            return {"success": False, "message": "Email has already been used"}, 400

        new_user = User(username=_username, email=_email)
        new_user.set_password(_password)

        return {
            "success": True,
            "userId": new_user.id,
            "message": "This user is successfully registered",
        }, 200


@rest_api.route("/api/users/login")
class Login(Resource):
    """
    Creates a token used to authenticate other endpoints
    """

    @rest_api.expect(login_model, validate=True)
    def post(self):

        request_data = request.get_json()
        _email = request_data.get("email")
        _password = request_data.get("password")

        user = User.get_by_email(_email)

        if not user:
            return {"success": False, "message": "Invalid email address"}, 400

        if not user.check_password(_password):
            return {"success": False, "message": "Invalid credentials."}, 400

        token = jwt.encode(
            {"email": _email, "exp": datetime.utcnow() + timedelta(minutes=30)},
            BaseConfig.SECRET_KEY,
        )
        user.set_token_active(True)

        return {"success": True, "token": token }, 200


@rest_api.route("/api/users/logout")
class Logout(Resource):
    """
    Invalidates a users existing token
    """

    @authentication_required
    def post(self, user):

        _token = request.headers["authorization"]
        blocked_token = BlockedToken(
            token=_token
        )
        blocked_token.save()

        user.set_token_active(False)

        return {"success": True}, 200



@rest_api.route("/api/metrics")
class Metrics(Resource):
    """
    Create and Read metrics for a given user
    """

    @rest_api.expect(metric_model, validate=True)
    @authentication_required
    def post(self, user):

        request_data = request.get_json()

        _name = request_data.get("name")
        _value = request_data.get("value")

        metric = Metric(
            name=_name,
            value=_value,
            user=user)
        metric.save()

        return {"data": metric.to_json() }, 200


    @authentication_required
    def get(self, user):
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per-page", 100, type=int)

        metrics = user.metrics.paginate(page, per_page)
        pagination = get_paginate_context(metrics)
        data = [metric.to_json() for metric in metrics.items]

        return {"pagination": pagination, "data": data}, 200
