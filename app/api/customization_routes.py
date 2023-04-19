from flask import Blueprint, jsonify
from app.models import Customization, User, db
from flask_login import current_user, login_required
customization_routes = Blueprint('customizations', __name__)


@customization_routes.route('/')
def customizations():
    """
    Query for all customizations and returns them in a list of customizations dictionaries
    """
    customizations = customization.query.all()
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
