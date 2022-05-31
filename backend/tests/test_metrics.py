import json


USERNAME = "test"
EMAIL = "test@gmail.com"
PASSWORD = "P@55word"


def test_create_user_metrics_successfully(client):
    """
    Tests /metrics/ API: create metrics
    """
    # Register user
    client.post(
        "api/users/signup",
        data=json.dumps({"username": USERNAME, "email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    login_response = client.post(
        "api/users/login",
        data=json.dumps({"email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    data = json.loads(login_response.data.decode())
    assert login_response.status_code == 200

    # Create metric
    request_data = json.dumps({"value": 90, "name": "temperature"})
    json_request_data = json.loads(request_data)
    response = client.post(
        "api/metrics",
        data=request_data,
        headers={"authorization": "Bearer " + data["token"]},
        content_type="application/json",
    )
    data = json.loads(response.data.decode())

    assert response.status_code == 200
    assert data["data"]["name"] == json_request_data["name"]
    assert data["data"]["value"] == json_request_data["value"]


def test_get_user_metrics_successfully(client):
    """
    Tests /metrics/ API: get user metrics
    """
    # Register user
    client.post(
        "api/users/signup",
        data=json.dumps({"username": USERNAME, "email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    login_response = client.post(
        "api/users/login",
        data=json.dumps({"email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    data = json.loads(login_response.data.decode())
    assert login_response.status_code == 200
    token = data["token"]

    # Create metric
    request_data = json.dumps({"value": 90, "name": "temperature"})
    json_request_data = json.loads(request_data)
    response = client.post(
        "api/metrics",
        data=request_data,
        headers={"authorization": "Bearer " + token},
        content_type="application/json",
    )
    data = json.loads(response.data.decode())

    assert response.status_code == 200
    assert data["data"]["name"] == json_request_data["name"]
    assert data["data"]["value"] == json_request_data["value"]

    # Get metrics
    response = client.get(
        "api/metrics",
        headers={"authorization": "Bearer " + token},
        content_type="application/json",
    )
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["data"][0]["name"] == json_request_data["name"]
    assert data["data"][0]["value"] == json_request_data["value"]
