from flask import Blueprint, render_template, redirect,request
from ..forms.post_form import PostForm
from datetime import date
from random import randint
from ..models import db, User, Post, Customization
from flask_login import current_user, login_required
from datetime import datetime
from sqlalchemy.orm import joinedload

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    """get all posts and display them"""
    print("**************************")
    print("**************************")
    print("**************************")
    print("**************************")
    posts = Post.query.order_by(Post.post_date.desc()).all()
    return [{**post.to_dict(),
             'user':post.user.to_dict()
            #  ,"customizations": [c.to_dict() for c in post.post_customizations]
             } for post in posts]

@post_routes.route('/<int:id>')
def get_post_detail(id):
    post = Post.query.get(id)

    return {**post.to_dict(),
            "user": post.user.to_dict()
            , "customizations": [{**c.to_dict(),
                                 'drinks_customization': c.drink.to_dict()}
                                 for c in post.post_customizations]
            }

@post_routes.route('/new', methods=["GET", "POST"])
@login_required
def add_new_post():
    user = current_user.to_dict()
    form = PostForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    request_obj = request.get_json()
    # print("**************************")
    # print("**************************")
    # print("**************************")
    # print("**************************")
    # print(request_obj)
    customizations = request_obj["custChosen"] #an array of customizations included drinks info
    # customization["id"]

    if form.validate_on_submit():
        new_post = Post(
            author=user['id'],
            caption=form.data["caption"],
            image=form.data["image"],
            post_date=date.today(),
        )
        db.session.add(new_post)
        db.session.commit()
        print("==========================")
        print("==========================")
        print("==========================")
        print("==========================")
        print('After commit: ***', new_post.to_dict())

        if len(customizations) > 0:
            print("========================== before", new_post.post_customizations)
            new_post.post_customizations = []
            for c in customizations:
                print("==========================", c)
                cust = Customization.query.get(c["id"])
                new_post.post_customizations.append(cust) 
            db.session.commit()

            return {**new_post.to_dict()
                    , 'user': new_post.user.to_dict()
                    , "customizations": [{**c.to_dict(),
                                          'drinks_customization': c.drink.to_dict()}
                                         for c in new_post.post_customizations]
                    }
        return {**new_post.to_dict()
                , 'user': new_post.user.to_dict()
                }
    
    if form.errors:
        return {"message": "form errors", "errors": f"{form.errors}"}
    return {"message": 'Bad Data'}


# Edit Post
@post_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def update_post(id):
    user = current_user.to_dict()
    request_obj = request.get_json()
    customizations = request_obj["custChosen"]
    post = Post.query.get(id)

    if post.user_id == user["id"]:
        form = PostForm()
        form["csrf_token"].data = request.cookies["csrf_token"]
        if form.validate_on_submit():
            post.caption = form.data["caption"]
            post.image = form.data["image"]
            post.post_date = date.today()
            db.session.commit()
            if len(customizations) > 0:
                post = Post.query.options(joinedload(Post.post_customizations)).get(id)
                new_post_custs = [Customization.query.get(c['id']) for c in customizations]
                old_post_custs = [customization for customization in post.post_customizations]

                for o in old_post_custs:
                    if o not in new_post_custs:
                        post.post_customizations.remove(o)
                for n in new_post_custs:
                    if n not in old_post_custs:
                        post.post_customizations.append(n)

                db.session.commit()
            updated_post = Post.query.get(id)
            return {**updated_post.to_dict()
                    , 'user': updated_post.user.to_dict()
                    , "customizations": [{**c.to_dict(),
                                            'drinks_customization': c.drink.to_dict()}
                                            for c in updated_post.post_customizations]
                    }
        if form.errors:
            return {"message": "form errors", "errors": f"{form.errors}"}
        return {"message": 'Bad Data'}
            

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