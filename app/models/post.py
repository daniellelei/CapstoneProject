from .db import db, environment, SCHEMA, add_prefix_for_prod
from .likes import likes
from .post_custs import post_custs
class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(250), nullable=False)
    author = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("users.id")))
    image = db.Column(db.String(250), nullable=False)
    post_date = db.Column(db.Date, nullable=False)
    
    # RELATIONSHIP ATTRIBUTED
    user = db.relationship(
        "User",
        back_populates="posts"
    )

    post_likes = db.relationship(
        "User",
        secondary=likes,
        back_populates="user_likes"
    )

    post_customizations = db.relationship(
        "Customization",
        secondary = post_custs,
        back_populates="customization_posts",
        
    )

    comments = db.relationship('Comment', back_populates='post')

    def to_dict(self):
        return {
            "id": self.id,
            "caption": self.caption,
            "image": self.image,
            "postDate": self.post_date,
            "author_id":self.author,
            # "user": self.user.to_dict_no_post()
        }
    
    # def to_dict_no_user(self):
    #     return {
    #         "id": self.id,
    #         "caption": self.caption,
    #         "image": self.image,
    #         "postDate": self.post_date,
    #         "likes": len(self.post_likes)
    #     }
