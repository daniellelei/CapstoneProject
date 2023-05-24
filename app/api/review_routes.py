from flask import Blueprint,request
from ..forms.review_form import ReviewForm
from flask_login import current_user, login_required
from ..models import db, User, Post, Review


review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def get_all_reviews():
    """get all reviews and display them"""
    reviews = Review.query.order_by(Review.id.desc()).all()
    return [{**review.to_dict(),
             'user': review.user.to_dict(),
             'post':review.post.to_dict()
             } for review in reviews]




