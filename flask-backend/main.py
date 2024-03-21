from flask import Flask
from config import DevelopmentConfig
from flask_restx import Api, Resource, fields
from models import db, Recipe


app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
db.init_app(app)
api = Api(app, doc="/docs")

# Models {Serializer} transforms data to JSON format

recipe_models = api.model(
    "Recipe",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String()
    }
)


# First API route
@api.route('/hello')
class HelloResource(Resource):

    def get(self):
        message = {
            "sender": "deecodes",
            "message": "Hello guys, it's my first API",
            "code": "200"
        }
        return message

# CRUD endpoints
    
@api.route("/recipes")
class RecipesResource(Resource):
    def get(self):
        # Get a recipe
        pass
    def post(self):
        # Post a recipe
        pass

@api.route("/recipe/<int:id>")
class RecipeResource(Resource):
    def get(self, id):
        # Get a recipe by a specified ID
        pass

    def update(self, id):
        # Update a recipe by a specified ID
        pass

    def delete(self, id):
        # Delete a recipe by a specified ID
        pass

# Shell Configuration
@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Recipe": Recipe
    }   


if __name__ == "__main__":
    app.run()