from flask import Blueprint, jsonify, request
from app.models import Customization, User, db
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
    customization = customization.query.get(id)
    return customization.to_dict()

@customization_routes.route('/current')
def get_user_customization():
    user = current_user.to_dict()
    user_customizations = Customization.query.filter(Customization.user_id == user["id"])
    customizations = [{**customization.to_dict(),
                "User":customization.user.to_dict(),
                "Drink":customization.drink.to_dict(),
                "Cart": customization.cart.to_dict()
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
            cart_id = cart_id,
            drink_id = drink_id,
            size = form.data["Size"],
            milk = form.data['Milk'],
            shotOptions = form.data['Shot options'],
            expressoRoastOptions=form.data['Expresso Roast Options'],
        )
        db.session.add(new_customization)
        db.session.commit()
        return {'Customization':new_customization.to_dict(), 
                'User':new_customization.user.to_dict(), 
                'Drink':new_customization.drink.to_dict(),
                'Cart':new_customization.cart.to_dict()
                }

    if form.errors:
        return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": 'Bad Data'}


@customization_routes.route('/<int:id>', methods=['PATCH', 'PUT'])
@login_required
def update_customization(id, drink_id, cart_id):
    user = current_user.to_dict()
    customization = Customization.query.get(id)

    if customization.user_id == user["id"]:
        form = CustomizationForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            customization.size = form.data["Size"]
            customization.milk = form.data['Milk']
            customization.shotOptions=form.data['Shot options']
            customization.expressoRoastOptions = form.data['Expresso Roast Options']
            
            db.session.commit()
            updated_customization = Customization.query.get(id)
            return {'Customization': updated_customization.to_dict(),
                    'User': updated_customization.user.to_dict(),
                    'Drink': updated_customization.drink.to_dict(),
                    'Cart': updated_customization.cart.to_dict()
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
