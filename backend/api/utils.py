from functools import wraps
import jwt
from flask import request

from .config import BaseConfig


def deserialize_datetime(datetime):
    """
    Deserialize datetime object into string form for JSON processing.
    params: datetime
    return 2022-04-02 19:02:04
    """
    if datetime is None:
        return None
    return datetime.strftime("%Y-%m-%d %H:%M:%S")


def get_paginate_context(query):
    """
    Gets the pagination context for a given query
    params:
        query:
    return: {}
    """
    pagination = {
        "count": query.total,
        "page": query.page,
        "per_page": query.per_page,
        "pages": query.pages,
    }
    return pagination


def authentication_required(f):
    """
    Decorator method for JWT token authentication
    """

    from .db_models import db, User, BlockedToken

    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if "authorization" in request.headers:
            token = request.headers["authorization"].split(" ")[1]

        if not token:
            return {"success": False, "message": "A valid JWT token is required"}, 400

        try:
            data = jwt.decode(token, BaseConfig.SECRET_KEY, algorithms=["HS256"])
            current_user = User.get_by_email(data["email"])

            if not current_user:
                return {
                    "success": False,
                    "message": "This user does not exist.",
                }, 400

            token_expired = (
                db.session.query(BlockedToken.id).filter_by(token=token).scalar()
            )

            if token_expired is not None:
                return {"success": False, "message": "Token revoked."}, 400

            if not current_user.is_token_active:
                return {"success": False, "message": "Token expired."}, 400

        except:
            return {"success": False, "message": "Token is invalid"}, 400

        return f(user=current_user, *args, **kwargs)

    return decorator
