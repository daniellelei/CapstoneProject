from flask import Blueprint,request
from ..forms.comment_form import ReviewForm
from flask_login import current_user, login_required
from ..models import db, User, Post, Review
from datetime import datetime

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def get_all_reviews():
    """get all reviews and display them"""
    reviews = Review.query.order_by(Review.id.desc()).all()
    return [{**review.to_dict(),
             'user': review.user.to_dict(),
             'post':review.post.to_dict()
             } for review in reviews]


@review_routes.route('/<int:id>', methods=['PUT', 'PATCH'])
@login_required
def edit_review(id):
    user = current_user.to_dict()
    review = Review.query.get(id)
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        review.reviewBody = form.data['reviewBody']
        
        review.dateTime = datetime.now()
        db.session.commit()
        updated_review = Review.query.get(id)
        return {**updated_review.to_dict()
                , 'user': updated_review.user.to_dict()
                , 'post': updated_review.post.to_dict()
                }
    
    if form.errors:
        return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": 'Bad Data'}


@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review_to_delete = Review.query.get(id)
    if review_to_delete:
        db.session.delete(review_to_delete)
        db.session.commit()
        return {'message': 'Review deleted!'}
    else:
        return {'message': 'Review not found.'}

