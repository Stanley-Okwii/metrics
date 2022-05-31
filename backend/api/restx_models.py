from flask_restx import Api, fields

rest_api = Api(version="1.0", title="Metrics API")

signup_model = rest_api.model(
    "SignUpModel",
    {
        "username": fields.String(required=True, min_length=2, max_length=32),
        "email": fields.String(required=True, min_length=4, max_length=64),
        "password": fields.String(required=True, min_length=4, max_length=16),
    },
)

login_model = rest_api.model(
    "LoginModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=64),
        "password": fields.String(required=True, min_length=8, max_length=16),
    },
)

metric_model = rest_api.model(
    "MetricModel",
    {
        "name": fields.String(required=True, min_length=1, max_length=32),
        "value": fields.Integer(required=True, min_length=2, max_length=10),
    },
)