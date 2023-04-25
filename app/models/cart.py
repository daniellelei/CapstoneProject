from .db import db, environment, SCHEMA, add_prefix_for_prod
from .cart_drinks import Cart_drink
from .cart_customizations import Cart_customization
from datetime import datetime
class Cart (db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Float)
    paid = db.Column(db.Boolean, default=False, nullable=False, unique=False)
    created_time = db.Column(db.DateTime, default=datetime.now())
    paid_time = db.Column(db.DateTime)
    processed = db.Column(db.Boolean, default = False, nullable=False, unique=False)
    processed_time = db.Column(db.DateTime)
    
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    user = db.relationship('User', back_populates='carts')
    cart_customizations = db.relationship(
        'Cart_customization',
        back_populates = 'cart'
    )

    cart_drinks = db.relationship(
        'Cart_drink', 
        back_populates='cart'
    )


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total_price': self.total_price,
            'paid':self.paid,
            'created_time':self.created_time,
            'paid_time':self.paid_time
        }