from flask import Flask
from config import DevelopmentConfig
from flask_restx import Api, Resource
from models import db, Recipe


app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
db.init_app(app)
api = Api(app, doc="/docs")


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


# Shell Configuration
@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Recipe": Recipe
    }   

if __name__ == "__main__":
    app.run()