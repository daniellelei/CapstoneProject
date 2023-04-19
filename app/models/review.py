from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review (db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    drink_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("drinks.id")), nullable=False
    )
    reviewBody = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    #relationship attributes
    user = db.relationship('User', back_populates= "reviews")
    drink = db.relationship('Drink', back_populates="reviews")
    

    def to_dict(self):
        return {
            'id': self.id,
            'user_id':self.user_id,
            'drink_id':self.drink_id,
            'reviewBody': self.reviewBody,
            'rating': self.rating
        }