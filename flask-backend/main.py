from flask import Flask
from config import DevelopmentConfig
from flask_restx import Api, Resource

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
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
    

if __name__ == "__main__":
    app.run()