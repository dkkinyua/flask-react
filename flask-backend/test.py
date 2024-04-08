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

    #Testing our signup endpoint
    def test_signup(self):
        test_user = {
                "username": "testuser",
                "email": "testuser@recipe.com",
                "password": "testuser1",
            }

        signup_response = self.client.post("/auth/signup", json=test_user)

        status_code = signup_response.status_code

        self.assertEqual(status_code, 201)

    # Testing our login endpoint
    def test_login(self):
        signup_response = self.client.post("/auth/signup", json={
            "username": "testuser",
            "email": "testuser@recipe.com",
            "password": "testuser1"
        })

        test_user = {
            "username": "testuser",
            "password": "testuser1"
        }

        login_response = self.client.post("/auth/login", json=test_user)
        status_code = login_response.status_code

        #json = login_response.json
        #print(json)

        self.assertEqual(status_code, 200)

    # A test to get all recipes
    def test_all_recipes(self):
        recipe_response = self.client.get("/recipe/recipes")

        status_code = recipe_response.status_code

        self.assertEqual(status_code, 200)

    # A test to get a single recipe
    def test_get_recipe(self):
        id = 1 

        recipe_response = self.client.get(f"/recipe/recipes/{id}")

        status_code = recipe_response.status_code

        self.assertEqual(status_code, 404)

    # A test to post a recipe, requires a token
    def test_post_recipe(self):
        signup_response = self.client.post("/auth/signup", json={
            "username": "testuser",
            "email": "testuser@recipe.com",
            "password": "testuser1"
        })

        test_user = {
            "username": "testuser",
            "password": "testuser1"
        }

        test_recipe = {
            "title": "Githeri Rasta",
            "description": "How to cook githeri rasta at home"
        }

        login_response = self.client.post("/auth/login", json=test_user)

        access_token = login_response.json["access_token"]

        header = {
            "Authorization": f"Bearer {access_token}"
        }

        recipe_response = self.client.post("/recipe/recipes", json=test_recipe, headers=header)

        status_code = recipe_response.status_code

        self.assertEqual(status_code, 201)

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()


if __name__ == "__main__":
    unittest.main()