def test_course_crud_flow(client_fixture):

    user_payload = {
        "username": "courseuser",
        "email": "course@example.com",
        "password": "secure123",
        "career": "Physics",
        "gender": "m",
        "university": "TEC",
    }
    client_fixture.post("/users/register", json=user_payload)
    login = client_fixture.post(
        "/users/login", json={"email": "course@example.com", "password": "secure123"}
    )
    token = login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    term_payload = {"name": "2025-A", "is_active": True}
    term = client_fixture.post("/terms/", json=term_payload, headers=headers).json()
    term_id = term["id"]

    course_payload = {
        "name": "Intro to Quantum",
        "code": "FIS101",
        "credits": 4,
        "status": "in_progress",
        "term_id": term_id,
    }
    response = client_fixture.post("/courses/", json=course_payload, headers=headers)
    assert response.status_code == 200
    course = response.json()
    assert course["name"] == "Intro to Quantum"

    updated_payload = {**course_payload, "name": "Quantum Mechanics I"}
    response = client_fixture.put(
        f"/courses/{course['id']}", json=updated_payload, headers=headers
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Quantum Mechanics I"

    response = client_fixture.delete(f"/courses/{course['id']}", headers=headers)
    assert response.status_code == 200


def test_create_course_with_invalid_term(client_fixture, auth_headers):
    course_payload = {
        "name": "Invalid Term Course",
        "code": "INV999",
        "credits": 3,
        "status": "in_progress",
        "term_id": 9999,
    }
    response = client_fixture.post(
        "/courses/", json=course_payload, headers=auth_headers
    )
    assert response.status_code in [400, 404]


def test_create_course_with_optional_fields(client_fixture, auth_headers, term_id):
    course_payload = {
        "name": "Advanced Calculus",
        "code": "MAT302",
        "credits": 4,
        "status": "approved",
        "professor_name": "Dr. Smith",
        "room": "F-202",
        "term_id": term_id,
    }
    response = client_fixture.post(
        "/courses/", json=course_payload, headers=auth_headers
    )
    assert response.status_code == 200
    data = response.json()
    assert data["professor_name"] == "Dr. Smith"
    assert data["room"] == "F-202"


def test_create_duplicate_course_code(client_fixture, auth_headers, term_id):
    course_payload = {
        "name": "Physics Lab",
        "code": "PHY100",
        "credits": 2,
        "status": "in_progress",
        "term_id": term_id,
    }
    response1 = client_fixture.post(
        "/courses/", json=course_payload, headers=auth_headers
    )
    assert response1.status_code == 200

    response2 = client_fixture.post(
        "/courses/", json=course_payload, headers=auth_headers
    )
    assert response2.status_code in [400, 422]


def test_get_courses_by_term(client_fixture, auth_headers, term_id):
    response = client_fixture.get(f"/courses/term/{term_id}", headers=auth_headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_update_course_from_other_user(client_fixture, auth_headers_other_user):
    update_payload = {
        "name": "Hacked Course",
        "code": "HCK101",
        "credits": 5,
        "status": "in_progress",
        "term_id": 1,
    }
    response = client_fixture.put(
        "/courses/1", json=update_payload, headers=auth_headers_other_user
    )
    assert response.status_code in [403, 404]
