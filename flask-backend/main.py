from flask import Flask, request, jsonify
from config import DevelopmentConfig
from flask_restx import Api, Resource, fields
from models import db, Recipe, User
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
db.init_app(app)
migrate = Migrate(app, db)
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
    
# A sign up route
@api.route("/signup")
class SignUp(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        db_user = User.query.filter(username=username).first()

        if db_user is not None:
            return jsonify({"message": f"A user with username {username} currently exists, try using another email."})
        
        email = data.get('email')
        db_email = User.query.filter(email=email).first()

        if db_email is not None:
            return jsonify({"message": f"A user has registered an account with {email}, try using another email."})

        new_user = User(
            username = data.get('username'),
            email = data.get('email'),
            password = generate_password_hash(data.get('password'))
        )
        new_user.save()
        return f"<New User Signed: {new_user}>", 200

# The login route
@api.route("/login")
class Login(Resource):
    def post(self):
        pass

# CRUD endpoints 
@api.route("/recipes")
class RecipesResource(Resource):
    # A Flask RESTful decorator to fetch a list of items
    @api.marshal_list_with(recipe_models)
    def get(self):
        # Get all recipes
        recipes = Recipe.query.all()
        return recipes
    #A Flask RESTful decorator used to get a single item
    @api.marshal_with(recipe_models)
    @api.expect(recipe_models) #Tells the SwaggerUI what to expect from th API in terms of data format
    def post(self):
        # Post a recipe
        data = request.get_json()

        new_recipe = Recipe(
            title=data.get('title'),
            description=data.get('description')
        )
        new_recipe.save()
        return new_recipe, 201

@api.route("/recipe/<int:id>", methods = ['GET', 'PUT', 'DELETE', 'POST'])
class RecipeResource(Resource):
    @api.marshal_with(recipe_models)
    def get(self, id):
        # Get a recipe by a specified ID
        recipe = Recipe.query.get_or_404(id)
        return recipe

    @api.marshal_with(recipe_models)
    def put(self, id):
        # Update a recipe by a specified ID
        recipe_to_update = Recipe.query.get_or_404(id)
        data = request.get_json()
        recipe_to_update.update(data.get('title'), data.get('description'))
        return recipe_to_update
    
    @api.marshal_with(recipe_models)
    def delete(self, id):
        # Delete a recipe by a specified ID
        recipe_to_delete = Recipe.query.get_or_404(id)
        recipe_to_delete.delete()
        return {"message": "Recipe deleted."}, 200


# Shell Configuration
@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Recipe": Recipe
    }   


if __name__ == "__main__":
    app.run()