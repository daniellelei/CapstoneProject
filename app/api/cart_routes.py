from flask import Blueprint, jsonify, request
from app.models import Cart, db, User, Cart_customization, Cart_drink, Customization
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from datetime import datetime
# from ..forms import CartForm
cart_routes = Blueprint('carts', __name__)

@cart_routes.route('/')
def carts():
    """
    Query for all carts and returns them in a list of carts dictionaries
    """
    carts = Cart.query.filter(Cart.paid == True).order_by(Cart.paid_time.desc()).all()
    return [{**cart.to_dict(),
             'User': cart.user.to_dict(),
             'drinks': [d.drink.to_dict() for d in cart.cart_drinks],
             'customizations': [{**c.customization.to_dict(),
                                 'drinks_customization': c.customization.drink.to_dict()}
                                for c in cart.cart_customizations],
             } for cart in carts]


@cart_routes.route('/<int:id>')
def cart(id):
    """
    Query for a cart by id and returns that cart in a dictionary
    """
    cart = Cart.query.get(id)
    
    return [{**cart.to_dict(),
            "User": cart.user.to_dict(),
            # "Customizations":[c.to_dict() for c in cart.customizations],
            # "drinksInCart":[d.to_dict() for d in cart.drinksInCart]
            }]


# get all current user's carts
@cart_routes.route('/current')
@login_required
def get_user_cart():
    user = current_user.to_dict()
    user_carts = Cart.query.filter(
        Cart.user_id == user["id"])
    carts = [{**cart.to_dict(),
                       "User": cart.user.to_dict(),
                    #    "Customization": [c.to_dict() for c in cart.customizations],
                    #    "drinksInCart": [d.to_dict() for d in cart.drinksInCart]
                       } for cart in user_carts]

    return carts

# get the most recent cart
@cart_routes.route('/lastcurrent')
@login_required
def get_user_last_cart():
    user = current_user.to_dict()
    cart = Cart.query.filter(
        Cart.user_id == user["id"]).order_by((Cart.id).desc()).first()
    # print("**************************")
    # print("**************************")
    # print("**************************")
    # print("**************************")
    # print('CART ***', cart.to_dict())
    # print('CART ***', cart.cart_customizations)
    if cart.cart_customizations is not None:
        if cart.cart_drinks is not None:
            current_cart = {**cart.to_dict(),
                        "User": cart.user.to_dict(),
                        'customizations': [{**c.customization.to_dict(), 
                                        'drinks_customization':c.customization.drink.to_dict()} 
                                        for c in cart.cart_customizations],
                        'drinks': [d.drink.to_dict() for d in cart.cart_drinks],
                        # "drinksInCart": [d.to_dict() for d in cart.drinksInCart]
                }
            return current_cart
        else:
            current_cart = {**cart.to_dict(),
                            "User": cart.user.to_dict(),
                            'customizations': [{**c.customization.to_dict(),
                                                'drinks_customization': c.customization.drink.to_dict()}
                                               for c in cart.cart_customizations],
                            # 'drinks': [d.drink.to_dict() for d in cart.cart_drinks],          
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
        cart_drinks = []
    )
    db.session.add(new_cart)
    db.session.commit()
    return {**new_cart.to_dict(),
            "User": new_cart.user.to_dict(),
            "cart_customizations": [],
            "cart_drinks": [],
            # "drinksInCart":[]
            }

@cart_routes.route("/<int:id>", methods=["PATCH"])
@login_required
def delete_cart(id):
    cart = Cart.query.get(id)
    user = current_user.to_dict()
    userId = user["id"]
    fund = user["funds"]
    request_obj = float(request.get_json())  #totalCharge
    if cart.cart_customizations is not None:
        # list of all the customizations
        # custs = [{c.to_dict() for c in cart.cart_customizations}] 
        print("*************")
        print("*************")
        print("*************")
        print("*************")
        print("*************")
        print("*************")
        print([{
                **c.customization.to_dict()
                } for c in cart.cart_customizations])
        # return ([{
        #         **c.customization.to_dict()
        #         } for c in cart.cart_customizations])
        custs = [{
            **c.customization.to_dict()
        } for c in cart.cart_customizations]
        # make copy of these and change the userId 
        for cust in custs:
            new_c = Customization(
                user_id = 2,
                drink_id=cust["drink_id"],
                size=cust["size"],
                milk=cust['milk'],
                shotOptions=cust['shotOptions'],
                expressoRoastOptions=cust['expressoRoastOptions'],
                toppings=cust['toppings'],
                flavors=cust['flavors'],
                addIns=cust['addIns'],
                sweeteners=cust['sweeteners'],
                teaBase=cust['teaBase'],
            )
            db.session.add(new_c)
            db.session.commit()
            new_cart_cust=Cart_customization(
                cart_id = cart.id,
                customization_id = new_c.id
            )
            db.session.add(new_cart_cust)

            cart_cust = Cart_customization.query.filter(
                Cart_customization.cart_id==cart.id,
                Cart_customization.customization_id == cust["id"]).first()
            
            db.session.delete(cart_cust)
            db.session.commit()


    if request_obj:
        if cart:
            user = User.query.get(userId)
            user.funds = fund - request_obj
            # updated_user = User.query.get(userId)
            cart.total_price = request_obj
            cart.paid = True
            cart.paid_time = datetime.now()
            db.session.commit()

            return {"message": 'Cart Deleted!'}
        return {"message": 'Cart not found'}
    return {"message": 'Total charge is required'}


@cart_routes.route('/unprocessed')
@login_required
def get_unprocessed_carts():
    """
    Query for all carts that are not processed and returns a list of carts dictionaries
    """
    carts = Cart.query.filter(
        Cart.processed == False, Cart.paid == True).order_by(Cart.paid_time).all()
    
    user = current_user.to_dict()
    if user["username"] == 'boss' or user["username"] == 'staff':
        return [{**cart.to_dict(),
                'User': cart.user.to_dict(),
                'drinks': [d.drink.to_dict() for d in cart.cart_drinks],
                'customizations': [{**c.customization.to_dict(),
                                    'drinks_customization': c.customization.drink.to_dict()}
                                   for c in cart.cart_customizations],
                } for cart in carts]
    else: 
        return{"message": "Only owner and staff could view this data."}


@cart_routes.route('/<int:id>/process', methods = ['PATCH'])
@login_required
def process_cart(id):

    cart = Cart.query.get(id)
    user = current_user.to_dict()
    if cart:
        if user["username"] == 'boss' or user["username"] == 'staff':
            cart.processed = True
            cart.processed_time = datetime.now()
            db.session.commit()
            processed_cart = Cart.query.get(id)
            return {**processed_cart.to_dict(),
                    'User': processed_cart.user.to_dict(),
                    'drinks': [d.drink.to_dict() for d in processed_cart.cart_drinks],
                    'customizations': [{**c.customization.to_dict(),
                                       'drinks_customization': c.customization.drink.to_dict()}
                                      for c in cart.cart_customizations],
                    }
        else: 
            return {"message": "Only owner and staff could process drinks."}
    else:
        return {"message": "cart is not found"}



