from flask import Flask
from config import DevelopmentConfig
from flask_restx import Api
from models import db, Recipe, User
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from auth import auth_ns
from recipes import recipe_ns

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)

    migrate = Migrate(app, db)
    api = Api(app, doc="/docs")

    api.add_namespace(auth_ns)
    api.add_namespace(recipe_ns)

    JWTManager(app)

    # Shell Configuration
    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "Recipe": Recipe,
            "User": User
        }   

    return app