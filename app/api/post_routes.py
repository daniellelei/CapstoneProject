from flask import Blueprint, render_template, redirect,request
from ..forms.post_form import PostForm
from datetime import date
from random import randint
from ..models import db, User, Post, Customization
from flask_login import current_user, login_required
from datetime import datetime

post_routes = Blueprint("posts", __name__)


@post_routes.route("/")
def get_all_posts():
    """get all posts and display them"""
    posts = Post.query.order_by(Post.post_date.desc()).all()
    return [{**post.to_dict(),
             "customizations": [c.to_dict() for c in post.post_customizations]
             } for post in posts]

@post_routes.route('/<int:id>')
def get_post_detail(id):
    post = Post.query.get(id)

    return {**post.to_dict(),
            "customizations": [c.to_dict() for c in post.post_customizations]
            }

@post_routes.route('/new', methods=["GET", "POST"])
@login_required
def add_new_post():
    user = current_user.to_dict()
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_post = Post(
            author=user['id'],
            caption=form.data["caption"],
            image=form.data["image"],
            post_date=date.today(),
        )
        db.session.add(new_post)
        db.session.commit()
        return {**new_post.to_dict(),
                "customizations": [p.to_dict() for p in new_post.post_customizations]
                }
    
    if form.errors:
        return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": 'Bad Data'}


@post_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def update_post(id):
    user = current_user.to_dict()
    post = Post.query.get(id)

    if post.user_id == user["id"]:
        form = PostForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            post.caption = form.data["caption"]
            post.image = form.data["image"]
            post.customization_id=form.data["customization_id"]
            post.post_date = date.today()

            db.session.commit()
            updated_post = Post.query.get(id)
            return {**updated_post.to_dict(),
                    'customizations': updated_post.post_customizations.to_dict()
                    }

@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    post = Post.query.get(id)
    if (post):
        db.session.delete(post)
        db.session.commit()
        return {"message": "Post deleted!"}
    else:
        return{"message": "Post not found."}