from .db import db, environment, SCHEMA, add_prefix_for_prod
from .cart_customizations import cart_customizations


class Customization (db.Model):
    __tablename__ = 'customizations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    
    drink_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("drinks.id")), nullable=False
    )
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    size = db.Column(db.String(40), nullable=False)
    milk = db.Column(db.String(255))
    preparationMethod = db.Column(db.String(255))
    shotOptions = db.Column(db.Integer)
    expressoRoastOptions = db.Column(db.String(255))
    teaBase = db.Column(db.String(255))

    # relationship attributes
    user = db.relationship('User', back_populates = "customizations")
    drink = db.relationship('Drink', back_populates = "customizations")
    carts = db.relationship(
        'Cart', 
        secondary=cart_customizations,
        back_populates="customizations")

    # flavor = db.relationship('Flavor', back_populates= "customization")
    # topping = db.relationship('Topping', back_populates="customization")
    # sweetener = db.relationship('Sweetener', back_populates="customization")
    # addIns = db.relationship('AddIn', back_populates="customization")
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id':self.user_id,
            'drink_id' : self.drink_id,
            'size': self.size,
            'milk': self.milk,
            'preparationMethod': self.preparationMethod,
            'shotOptions': self.shotOptions,
            'expressoRoastOptions': self.expressoRoastOptions,
            'teaBase':self.teaBase
        }