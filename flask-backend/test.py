import unittest
from main import create_app
from config import TestConfig
from extensions import db

class APITestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()

    def test_hello(self):
        hello_response = self.client.get("/recipe/hello")
        json = hello_response.json

        self.assertEqual(json, {"message": "Hello World"})

    def test_signup(self):
        test_user = {
                "username": "testuser",
                "email": "testuser@recipe.com",
                "password": "testuser1",
            }

        signup_response = self.client.post("/auth/signup", json=test_user)

        status_code = signup_response.status_code

        self.assertEqual(status_code, 201)

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    unittest.main()