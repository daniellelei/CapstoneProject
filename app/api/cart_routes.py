from flask import Blueprint, jsonify, request
from app.models import Cart, db
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('/')
def carts():
    """
    Query for all carts and returns them in a list of carts dictionaries
    """
    carts = Cart.query.all()
    return {'carts': [cart.to_dict() for cart in carts]}


@cart_routes.route('/<int:id>')
def cart(id):
    """
    Query for a cart by id and returns that cart in a dictionary
    """
    cart = Cart.query.get(id)
    return cart.to_dict()


@cart_routes.route('/current')
@login_required
def get_user_cart():
    user = current_user.to_dict()
    user_carts = Cart.query.filter(
        Cart.user_id == user["id"])
    carts = [{**cart.to_dict(),
                       "User": cart.user.to_dict(),
                       "Customization": cart.customization.to_dict(),
                       "drinksInCart": cart.drinksInCart.to_dict()
                       } for cart in user_carts]

    return carts


