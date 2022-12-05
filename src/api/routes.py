"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from typing import List

#Create flask app

api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/user", methods=["GET"])
def getUsers():

    users = User.query.all()
    users_list = list(map(lambda x: x.serialize(), users))    
    
    return jsonify(users_list), 200    

@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"Email or password incorrect"}), 401 

    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token}), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"msg": "ok"}), 200

@api.route("/signup", methods=["POST"])
def register_user():

    email=request.json.get("email", None)
    password=request.json.get("password", None)
    is_active=True

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"Error": "User already exists"})

    new_user = User(email=email, password=password, is_active=is_active)    

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })        


