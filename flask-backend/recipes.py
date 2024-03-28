from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required
from models import Recipe

recipe_ns = Namespace("recipe", description="A namespace for recipes")

recipe_model = recipe_ns(
    "Recipe",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String()
    }
)

@recipe_ns.route("recipes")
class RecipesResource(Resource):
    # A route to get all recipes
    @recipe_ns.marshal_list_with(recipe_model)
    def get(self):
        recipes = Recipe.query.all()
        return recipes
    
    # A route to post a recipe
    @recipe_ns.marshal_with(recipe_model)
    @recipe_ns.expect(recipe_model)
    @jwt_required()
    def post(self):
        data = request.get_json()
        new_recipe = Recipe(
            title = data.get("title"),
            description = data.get("description")
        )
        new_recipe.save()
        return new_recipe
    
@recipe_ns.route("/recipe/<int:id>")
class RecipeResource(Resource):
    # A route to get a recipe by id
    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def get(self, id):
        recipe = Recipe.query.get_or_404(id)
        return recipe
    
    # A recipe to update our recipe
    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def put(self, id):
        recipe_to_update = Recipe.query.get_or_404(id)
        data = request.get_json()
        recipe_to_update.update(
            title = data.get("title"),
            description = data.get("description")
        )
        return recipe_to_update
    
    # A route to delete a recipe
    @recipe_ns.marshal_with(recipe_model)
    @jwt_required()
    def delete(self, id):
        recipe_to_delete = Recipe.query.get_or_404(id)
        recipe_to_delete.delete()
        return jsonify({
            "message": "The recipe has been deleted."
        }), 200
