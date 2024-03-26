from flask import request, jsonify
from flask_restx import Resource, Namespace
from main import signup_model, login_model
from flask_jwt_extended import jwt_required, create_access_token, create_refresh_token
from models import User
from werkzeug.security import generate_password_hash, check_password_hash

auth_ns = Namespace("auth", description="This is a namespace for handling authentication and logins")

# A login route
@auth_ns.route("/login", methods=["POST"])
class Login(Resource):
    @auth_ns.expect(login_model)
    @jwt_required()
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        db_user = User.query.filter_by(username=username).first()

        if db_user and check_password_hash(db_user.password, password):
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)

            return jsonify (
                {
                    "access_token": access_token,
                    "refresh_token": refresh_token
                }
            )
        
# A signup route
@auth_ns.route("/signup", methods=["POST"])
class SignUp(Resource):
    @auth_ns.expect(signup_model)
    @jwt_required()
    def post(self):
        data = request.get_json()
        
        new_user = User(
            username = data.get("username"),
            password = data.get("password"),
            email = data.get("email")
        )

        new_user.save()
        return jsonify(
            {
                "message": "User created successfully!"
            }
        )