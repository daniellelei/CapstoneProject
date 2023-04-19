from .db import db, environment, SCHEMA, add_prefix_for_prod
from .cart_drink import cart_drinks


class Cart (db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    total_price = db.Column(db.Float, nullable=False)

    user = db.relationship('User', back_populates='carts')
    customizations = db.relationship('Customization', back_populates='cart')

    drinksInCart = db.relationship(
        "Drink", secondary=cart_drinks, back_populates="cart_drinks"
    )


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_price': self.total_price
        }