def test_full_user_term_course_flow(client):

    user_payload = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "123456",
        "career": "Computer Science",
        "gender": "m",
        "university": "Test University",
    }
    response = client.post("/users/register", json=user_payload)
    assert response.status_code == 200
    user = response.json()
    user_id = user["id"]

    term_payload = {"name": "2025-I", "is_active": True, "user_id": user_id}
    response = client.post("/terms/", json=term_payload)
    assert response.status_code == 200
    term = response.json()
    term_id = term["id"]

    course_payload = {
        "code": "CS101",
        "name": "Intro to CS",
        "credits": 4,
        "professor_name": "Dr. X",
        "room": "B101",
        "status": "in_progress",
        "term_id": term_id,
    }
    response = client.post("/courses/", json=course_payload)
    assert response.status_code == 200
    course = response.json()
    course_id = course["id"]

    updated_payload = course_payload.copy()
    updated_payload["name"] = "Intro to Programming"
    response = client.put(f"/courses/{course_id}", json=updated_payload)
    assert response.status_code == 200
    assert response.json()["name"] == "Intro to Programming"

    response = client.delete(f"/courses/{course_id}")
    assert response.status_code == 200
