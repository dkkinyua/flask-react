import unittest
from main import create_app
from config import TestConfig
from extensions import db

class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)

        with self.app.app_context():
            db.init_app(self.app)
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    # Tests the SIGNUP route
    def test_signup(self):
        signup_response = self.client.get("/auth/signup", json={
            "username": "testuser",
            "email": "testuser@user.com",
            "password": "testuser1"
        })

        status_code = signup_response.status_code

        self.assertEqual(status_code, 201)

if __name__ == "__main__":
    unittest.main()