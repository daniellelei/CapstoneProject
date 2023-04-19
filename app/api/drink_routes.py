from flask import Blueprint, jsonify
from app.models import Drink

drink_routes = Blueprint('drinks', __name__)

@drink_routes.route('/')
def drinks():
    
    """
    Query for all drinks and returns them in a list of drinks dictionaries
    """
    drinks = Drink.query.all()
    return {'drinks':[drink.to_dict() for drink in drinks]}

@drink_routes.route('/<int:id>')
def drink(id):
    """
    Query for a drink by id and returns that drink in a dictionary
    """
    drink = Drink.query.get(id)
    return drink.to_dict()
