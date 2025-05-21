def test_term_creation_and_exclusivity(client):

    user_payload = {
        "username": "termuser",
        "email": "term@example.com",
        "password": "pass1234",
        "career": "Math",
        "gender": "f",
        "university": "UCR",
    }
    client.post("/users/register", json=user_payload)

    login_payload = {"email": "term@example.com", "password": "pass1234"}
    login_response = client.post("/users/login", json=login_payload)
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    term_1 = {"name": "Q1-2025", "is_active": True}
    response1 = client.post("/terms/", json=term_1, headers=headers)
    assert response1.status_code == 200
    term_1_id = response1.json()["id"]

    term_2 = {"name": "Q2-2025", "is_active": True}
    response2 = client.post("/terms/", json=term_2, headers=headers)
    assert response2.status_code == 200
    term_2_id = response2.json()["id"]

    terms_response = client.get("/terms/", headers=headers)
    assert terms_response.status_code == 200
    terms = terms_response.json()
    assert len(terms) == 2

    active_terms = [t for t in terms if t["is_active"]]
    assert len(active_terms) == 1
    assert active_terms[0]["id"] == term_2_id
