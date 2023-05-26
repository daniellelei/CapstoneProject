from flask import Blueprint,request
from ..forms.comment_form import CommentForm
from flask_login import current_user, login_required
from ..models import db, User, Post, Comment
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def get_all_comments():
    """get all comments and display them"""
    comments = Comment.query.order_by(Comment.id.desc()).all()
    return [{**comment.to_dict(),
             'user': comment.user.to_dict(),
             'post':comment.post.to_dict()
             } for comment in comments]


@comment_routes.route('/<int:id>', methods=['PUT', 'PATCH'])
@login_required
def edit_comment(id):
    user = current_user.to_dict()
    comment = Comment.query.get(id)
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        comment.commentBody = form.data['commentBody']
        
        comment.dateTime = datetime.now()
        db.session.commit()
        updated_comment = Comment.query.get(id)
        return {**updated_comment.to_dict()
                , 'user': updated_comment.user.to_dict()
                , 'post': updated_comment.post.to_dict()
                }
    
    if form.errors:
        return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": 'Bad Data'}


@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment_to_delete = Comment.query.get(id)
    if comment_to_delete:
        db.session.delete(comment_to_delete)
        db.session.commit()
        return {'message': 'comment deleted!'}
    else:
        return {'message': 'comment not found.'}

