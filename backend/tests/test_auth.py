import pytest
import json

USERNAME = "test"
EMAIL = "test@gmail.com"
PASSWORD = "P@55word"


@pytest.fixture
def authenticated_client(client):
    # Register user
    client.post(
        "api/users/signup",
        data=json.dumps({"username": USERNAME, "email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    # Log in user
    client.post(
        "api/users/login",
        data=json.dumps({"email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )
    return client


def test_user_signup_successfully(client):
    """
    Test /users/signup API
    """
    response = client.post(
        "api/users/signup",
        data=json.dumps({"username": USERNAME, "email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    data = json.loads(response.data.decode())
    assert response.status_code == 200
    assert "This user is successfully registered" in data["message"]


def test_user_signup_with_no_email(client):
    """
    Tests /users/signup API: invalid data ie field empty
    """
    response = client.post(
        "api/users/signup",
        data=json.dumps({"username": USERNAME, "email": "", "password": PASSWORD}),
        content_type="application/json",
    )

    data = json.loads(response.data.decode())
    assert response.status_code == 400
    assert "'' is too short" in data["errors"]["email"]
    assert "Input payload validation failed" in data["message"]


def test_user_signup_with_same_email(client):
    """
    Tests /users/signup API: signup twice with the same email
    """
    client.post(
        "api/users/signup",
        data=json.dumps({"username": USERNAME, "email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    response = client.post(
        "api/users/signup",
        data=json.dumps({"username": USERNAME, "email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    data = json.loads(response.data.decode())

    assert response.status_code == 400
    assert "Email has already been used" in data["message"]


def test_user_login_successfully(client):
    """
    Tests /users/login API with correct credentials
    """
    # Register user
    client.post(
        "api/users/signup",
        data=json.dumps({"username": USERNAME, "email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    # Log in user
    response = client.post(
        "api/users/login",
        data=json.dumps({"email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    data = json.loads(response.data.decode())

    assert response.status_code == 200
    assert data["token"] != ""


def test_invalid_user_login(client):
    """
    Tests /users/login API: Invalid credentials
    """
    # Register user
    client.post(
        "api/users/signup",
        data=json.dumps({"username": USERNAME, "email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    # Log in user with error
    response = client.post(
        "api/users/login",
        data=json.dumps({"email": EMAIL, "password": EMAIL}),
        content_type="application/json",
    )

    data = json.loads(response.data.decode())
    assert response.status_code == 400
    assert "Invalid credentials." in data["message"]


def test_user_login_without_an_existing_account(client):
    """
    Tests /users/login API: login user with out valid account
    """
    response = client.post(
        "api/users/login",
        data=json.dumps({"email": EMAIL, "password": PASSWORD}),
        content_type="application/json",
    )

    data = json.loads(response.data.decode())
    assert response.status_code == 400
    assert "Invalid email address" in data["message"]


def test_user_logout_successfully(client):
    """
    Tests /users/logout API: logout user successfully
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

    # Log out
    logout_response = client.post(
        "api/users/logout",
        headers={"authorization": "Bearer " + data["token"]},
        content_type="application/json",
    )
    data = json.loads(logout_response.data.decode())
    assert logout_response.status_code == 200
    assert data["success"] == True
