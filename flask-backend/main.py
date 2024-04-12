from flask import Flask
from flask_cors import CORS
from flask_restx import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from models import Recipe, User
from extensions import db
from auth import auth_ns
from recipes import recipe_ns

def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)

    CORS(app)

    migrate = Migrate(app, db)
    JWTManager(app)

    api = Api(app, doc="/docs")

    api.add_namespace(auth_ns)
    api.add_namespace(recipe_ns)

        # Shell Configuration
    @app.shell_context_processor
    def make_shell_context():
        return {
            "db": db,
            "Recipe": Recipe,
            "User": User
        }

    return app  

