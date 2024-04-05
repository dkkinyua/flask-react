from flask import request, jsonify
from flask_restx import Resource, Namespace, fields
from flask_jwt_extended import jwt_required, create_access_token, create_refresh_token
from models import User
from werkzeug.security import generate_password_hash, check_password_hash

auth_ns = Namespace("auth", description="This is a namespace for handling authentication and logins")

signup_model = auth_ns.model(
    "Signup", 
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String()
    }
)

login_model = auth_ns.model(
    "login", 
    {
        "username": fields.String(),
        "password": fields.String()
    }
)


@auth_ns.route("/signup", methods=["POST"])
class SignUp(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        username = data.get("username")
        db_user = User.query.filter_by(username=username).first()

        if db_user is not None:
            return jsonify({
                "message": f"A user by the username: {username} exists, try another username."
            })
        
        email = data.get("email")
        db_email = User.query.filter_by(email=email).first()

        if db_email is not None:
            return jsonify({
                "message": f"An account with the email: {email} exists, try another email."
            })
        
        new_user = User(
            username = data.get("username"),
            email = data.get("email"),
            password = generate_password_hash(data.get("password"))
        )

        new_user.save()
        return jsonify(
            {
                "message": "User created successfully!"
            }
        )

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
