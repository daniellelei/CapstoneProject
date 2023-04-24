from .db import db, environment, SCHEMA, add_prefix_for_prod
from .cart_paid_ordered_drinks import cart_paid_ordered_drinks


class Ordered_drink (db.Model):
    __tablename__ = 'ordered_drinks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    cart_paid_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("cart_paids.id")), nullable=False)

    cart_paid = db.relationship(
        'Cart_paid',
        secondary=cart_paid_ordered_drinks,
        back_populates = 'ordered_drinks'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'cart_paid_id': self.cart_paid_id
        }
