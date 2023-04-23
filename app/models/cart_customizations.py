from .db import db, environment, SCHEMA, add_prefix_for_prod


class Cart_customization (db.Model):
    __tablename__ = 'cart_customizations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), nullable=False
    )
    customization_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("customizations.id")), nullable=False
    )

    cart = db.relationship('Cart', back_populates='cart_customizations')
    customization = db.relationship(
        'Customization', back_populates='cart_customizations')


    def to_dict(self):
        return {
            'id':self.id,
            'cart_id': self.cart_id,
            'customization_id': self.customization_id
        }
