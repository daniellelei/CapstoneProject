from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .likes import likes

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    funds = db.Column(db.Float, nullable=True)
    profile_pic = db.Column(db.String(250))

    # relationship attributes
    customizations = db.relationship('Customization', back_populates='user')
    carts = db.relationship('Cart', back_populates="user")
    reviews = db.relationship('Review', back_populates="user")

    posts = db.relationship(
        "Post",
        back_populates="user"
    )

    user_likes = db.relationship(
        "Post",
        secondary=likes,
        back_populates="post_likes",
        cascade="all, delete"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'funds': self.funds,
            "profilePic": self.profile_pic,
        }
    
    # def to_dict_no_post(self):
    #     return {
    #         "id": self.id,
    #         "username": self.username,
    #         "email": self.email,
    #         "profilePic": self.profile_pic,
    #         "likes": len(self.user_likes)
    #     }
