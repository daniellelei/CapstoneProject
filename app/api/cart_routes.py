from flask import Blueprint, jsonify, request
from app.models import Cart, db, User, Cart_customization
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
# from ..forms import CartForm
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
    
    return [{**cart.to_dict(),
            "User": cart.user.to_dict(),
            # "Customizations":[c.to_dict() for c in cart.customizations],
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
                    #    "Customization": [c.to_dict() for c in cart.customizations],
                       "drinksInCart": [d.to_dict() for d in cart.drinksInCart]
                       } for cart in user_carts]

    return carts


@cart_routes.route('/lastcurrent')
@login_required
def get_user_last_cart():
    user = current_user.to_dict()
    cart = Cart.query.filter(
        Cart.user_id == user["id"]).order_by((Cart.id).desc()).first()
    print("**************************")
    print("**************************")
    print("**************************")
    print("**************************")
    print('CART ***', cart.to_dict())
    print('CART ***', cart.cart_customizations)
    if cart.cart_customizations is not None:
        if cart.drinksInCart is not None:
            current_cart = {**cart.to_dict(),
                        "User": cart.user.to_dict(),
                        'customizations': [{**c.customization.to_dict(), 
                                        'drinks_customization':c.customization.drink.to_dict()} 
                                        for c in cart.cart_customizations],
                        "drinksInCart": [d.to_dict() for d in cart.drinksInCart]
                }
            return current_cart
        else:
            current_cart = {**cart.to_dict(),
                            "User": cart.user.to_dict(),
                            'customizations': [{**c.customization.to_dict(),
                                                'drinks_customization': c.customization.drink.to_dict()}
                                               for c in cart.cart_customizations],
                            # "drinksInCart": [d.to_dict() for d in cart.drinksInCart]
                            }
            return current_cart
    else:
        current_cart = {**cart.to_dict(),
                        "User": cart.user.to_dict(),
                        # 'customizations': [{**c.customization.to_dict(),
                        #                     'drinks_customization': c.customization.drink.to_dict()}
                        #                    for c in cart.cart_customizations],
                        # "drinksInCart": [d.to_dict() for d in cart.drinksInCart]
                        }
        return current_cart

            
@cart_routes.route('/', methods=['POST'])
@login_required
def create_cart():
    user = current_user.to_dict()
    new_cart = Cart(
        user_id = user['id'],
        cart_customizations = [],
        drinksInCart = []
    )
    db.session.add(new_cart)
    db.session.commit()
    return {**new_cart.to_dict(),
            "User": new_cart.user.to_dict(),
            "cart_customizations": {},
            "drinksInCart":{}
            }

@cart_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_cart(id):
    cart = Cart.query.get(id)
    user = current_user.to_dict()
    userId = user["id"]
    fund = user["funds"]
    request_obj = float(request.get_json())  #totalCharge
    if request_obj:
        if cart:
            user = User.query.get(userId)
            user.funds = fund - request_obj
            # updated_user = User.query.get(userId)
            cart_customizations = Cart_customization.query.filter(
                Cart_customization.cart_id == cart.id).all()
            removed_cart_custs = [db.session.delete(c) for c in cart_customizations]
            # db.session.delete(cart)
            db.session.commit()
            return {"message": 'Cart Deleted!'}
        return {"message": 'Cart not found'}
    return {"message": 'Total charge is required'}



    

