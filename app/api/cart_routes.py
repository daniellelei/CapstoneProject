from flask import Blueprint, jsonify, request
from app.models import Cart, db
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from ..forms import CartForm
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
    # return [{**cart.to_dict(),
    #         "User": cart.user.to_dict(),
    #         "Customization": cart.customization.to_dict(),
    #         "drinksInCart": cart.drinksInCart.to_dict()
    #         } for cart in user_carts]
    return [{**cart.to_dict(),
            "User": cart.user.to_dict(),
            "Customizations":[c.to_dict() for c in cart.customizations],
            "drinksInCart":[d.to_dict() for d in cart.drinksInCart]
            }]

    

@cart_routes.route('/current')
@login_required
def get_user_cart():
    user = current_user.to_dict()
    user_carts = Cart.query.filter(
        Cart.user_id == user["id"])
    carts = [{**cart.to_dict(),
                       "User": cart.user.to_dict(),
                       "Customization": [c.to_dict() for c in cart.customizations],
                       "drinksInCart": [d.to_dict() for d in cart.drinksInCart]
                       } for cart in user_carts]

    return carts


@cart_routes.route('/', methods=['POST'])
@login_required
def create_cart():
    user = current_user.to_dict()
    form = CartForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_cart = Cart(
            user_id=user['id'],
            total_price=form.data["total_price"],
            drink_id=form.data["drink_id"],
        )
        db.session.add(new_cart)
        db.session.commit()
        return {**new_cart.to_dict(),
                'User': new_cart.user.to_dict(),
                'Drink': new_cart.drink.to_dict(),
                'Cart': new_cart.cart.to_dict()
                }

    if form.errors:
        return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": 'Bad Data'}
