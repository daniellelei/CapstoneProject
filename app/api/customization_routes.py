from flask import Blueprint, jsonify, request
from app.models import Customization, User, db, Cart, Cart_customization
from flask_login import current_user, login_required
from sqlalchemy.orm import joinedload
from ..forms import CustomizationForm


customization_routes = Blueprint('customizations', __name__)


@customization_routes.route('/')
def customizations():
    """
    Query for all customizations and returns them in a list of customizations dictionaries
    """
    customizations = Customization.query.all()
    return {'customizations': [customization.to_dict() for customization in customizations]}


@customization_routes.route('/<int:id>')
def get_customization_by_id(id):
    """
    Query for a customization by id and returns that customization in a dictionary
    """
    customization = Customization.query.get(id)
    return {**customization.to_dict(),
            'User': customization.user.to_dict(),
            'Drink': customization.drink.to_dict(),
            'cart_customizations':[c.to_dict() for c in customization.cart_customizations]
            # 'carts': [cart.to_dict() for cart in customization.carts]
            }

@customization_routes.route('/current')
@login_required
def get_user_customization():
    user = current_user.to_dict()
    user_customizations = Customization.query.filter(Customization.user_id == user["id"])
    customizations = [{**customization.to_dict(),
                "User":customization.user.to_dict(),
                "Drink":customization.drink.to_dict(),
                
                } for customization in user_customizations]

    return customizations

@customization_routes.route('/', methods=['POST'])
@login_required
def create_customization():
    user = current_user.to_dict()
    form = CustomizationForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_customization = Customization(
            user_id = user['id'],
            cart_id = form.data["cart_id"],
            drink_id = form.data["drink_id"],
            size = form.data["size"],
            milk = form.data['milk'],
            shotOptions=form.data['shotOptions'],
            expressoRoastOptions=form.data['expressoRoastOptions'],
        )
        db.session.add(new_customization)
        db.session.commit()
        return {**new_customization.to_dict(), 
                'User':new_customization.user.to_dict(), 
                'Drink':new_customization.drink.to_dict(),
                # 'Cart':new_customization.cart.to_dict()
                }

    if form.errors:
        return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": 'Bad Data'}


@customization_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def update_customization(id):
    user = current_user.to_dict()
    customization = Customization.query.get(id)

    if customization.user_id == user["id"]:
        form = CustomizationForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            customization.size = form.data["size"]
            customization.milk = form.data['milk']
            customization.shotOptions = form.data['shotOptions']
            customization.expressoRoastOptions = form.data['expressoRoastOptions']
            
            db.session.commit()
            updated_customization = Customization.query.get(id)
            return {**updated_customization.to_dict(),
                    'User': updated_customization.user.to_dict(),
                    'Drink': updated_customization.drink.to_dict(),
                    # 'Cart': updated_customization.cart.to_dict()
                    }

        if form.errors:
            return {"message": "form errors", "statusCode": 400, "errors": f"{form.errors}"}

    return {"message": 'User does not own this customization'}

@customization_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_customization(id):
    customization = Customization.query.get(id)
    if customization:
        db.session.delete(customization)
        db.session.commit()
        return {"message": 'Customization Deleted!'}
    return {"message": 'Customization not found'}

@customization_routes.route('/<int:id>/addtocart', methods = ['PATCH'])
@login_required
def add_to_cart(id):
    user = current_user
    customization = Customization.query.get(id)
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
            
            print('cart from query',cart)
            if cart.user_id == user.id:
                newCartCust = Cart_customization(
                    cart_id = cartId,
                    customization_id = id
                )
                db.session.add(newCartCust)
                # if customization.cart_customizations:
                #     customization.cart_customizations.append(cartId)
                # else:
                #     customization.cart_customizations = []
                #     customization.cart_customizations.append(cartId)
                # if cart.cart_customizations:
                #     cart.cart_customizations.append(customization.id)
                # else:
                #     cart.cart_customizations = []
                #     cart.cart_customizations.append(customization.id)
            else:
                return {"message": "User does not own this cart"}

    db.session.commit()

    user = User.query.get(user.id)
    cart = Cart.query.get(cartId)
    return [{**cart_customization.to_dict(),
            "User": user.to_dict(),
            "cart": cart.to_dict(),
            'Drink': customization.drink.to_dict(),
            'customization': customization.to_dict()
            } for cart_customization in cart.cart_customizations]
