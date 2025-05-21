def test_register_user(client):
    payload = {
        "username": "authuser",
        "email": "auth@example.com",
        "password": "securepass",
        "career": "Engineering",
        "gender": "m",
        "university": "Tech Institute",
    }

    response = client.post("/users/register", json=payload)
    assert response.status_code == 200
    user = response.json()
    assert user["username"] == "authuser"
    assert user["email"] == "auth@example.com"
    assert "id" in user


def test_login_success_and_token_usage(client):
    payload = {"email": "auth@example.com", "password": "securepass"}

    response = client.post("/users/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    token = data["access_token"]

    # 🔍 Nuevo test directo con oauth2_scheme
    headers = {"Authorization": f"Bearer {token}"}

    # Si eso pasa, ahora sí seguimos con el endpoint protegido
    response = client.get("/users/me", headers=headers)
    assert response.status_code == 200


def test_login_with_wrong_password(client):
    payload = {"email": "auth@example.com", "password": "wrongpass"}

    response = client.post("/users/login", json=payload)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"


def test_login_with_unknown_user(client):
    payload = {"email": "notexist@example.com", "password": "doesntmatter"}

    response = client.post("/users/login", json=payload)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"
