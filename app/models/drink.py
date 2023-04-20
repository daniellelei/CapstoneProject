from .db import db, environment, SCHEMA, add_prefix_for_prod
from .cart_drink import cart_drinks


class Drink (db.Model):
    __tablename__ = 'drinks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    subCategory = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    imageUrl = db.Column(db.String(255))

    #relationship attributes
    customizations = db.relationship('Customization', back_populates= "drink")
    reviews = db.relationship('Review', back_populates='drink')

    cart_drinks = db.relationship(
        "Cart", secondary=cart_drinks, back_populates="drinksInCart"
    )


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'subCategory': self.subCategory,
            'price': self.price,
            'imageUrl': self.imageUrl
        }