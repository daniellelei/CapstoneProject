from .db import db, SCHEMA, environment, add_prefix_for_prod


class Cart_drink (db.Model):
    __tablename__ = 'cart_drinks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), nullable=False
    )
    drink_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("drinks.id")), nullable=False
    )

    cart = db.relationship('Cart', back_populates='cart_drinks')
    drink = db.relationship(
        'Drink', back_populates='cart_drinks')

    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'drink_id': self.drink_id
        }


