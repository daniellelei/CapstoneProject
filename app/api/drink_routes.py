from flask import Blueprint, jsonify, request
from app.models import Drink, Customization, User, db, Cart, Cart_customization, Cart_drink
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload


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

# add to cart
@drink_routes.route('/<int:id>/addtocart', methods=['PATCH'])
@login_required
def add_to_cart(id):
    user=current_user
    drink = Drink.query.get(id)
    request_obj = request.get_json()
    print("**************************")
    print("**************************")
    print("**************************")
    print("**************************")
    print(request_obj)

    if request_obj:
        cartId = int(request_obj["id"])
        if cartId:
            cart = Cart.query.get(cartId)
            if cart.user_id == user.id:
                newCartDrink = Cart_drink(
                    cart_id = cartId,
                    drink_id = id
                )
                print("**************************")
                print("**************************")
                print("**************************")
                print("**************************")
                print(newCartDrink)
                print(newCartDrink.to_dict())
                db.session.add(newCartDrink)
                print('==================================')
                db.session.commit()
            else:
                return {'message': "User does not own this cart"}

    user = User.query.get(user.id)
    cart = Cart.query.get(cartId)
    return [{**cart_customization.to_dict(),
            "User": user.to_dict(),
             "cart": cart.to_dict(),
             'Drink': drink.to_dict(),
             } for cart_customization in cart.cart_customizations]

# remove from cart
@drink_routes.route('/<int:id>/removefromcart', methods=['PATCH'])
@login_required
def remove_from_cart(id):
    user = current_user
    drink = Drink.query.get(id)
    request_obj = request.get_json()
    # print("**************************")
    # print("**************************")
    # print("**************************")
    # print("**************************")
    # print(request_obj)
    if request_obj:
        cartId = int(request_obj["id"])
        cart = Cart.query.get(cartId)

        if cartId:
            cart_drink = Cart_drink.query.filter(
                Cart_drink.cart_id==cartId and
                Cart_drink.drink_id==drink.id).first()

            # cart = Cart.query.get(cartId)
            if cart.user_id == user.id:
                db.session.delete(cart_drink)
                # if drink.cart_drinks:
                #     drink.cart_drinks.remove(cart)
                # if cart.drinksInCart:
                #     cart.drinksInCart.remove(drink)
                db.session.commit()
                return {'message':'drink_cart deleted'}
            else:
                return {'message': "User does not own this cart"}

