from .db import db, environment, SCHEMA, add_prefix_for_prod

class Order (db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), nullable=False
    )
    drink_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("drinks.id")), nullable=False
    )
    size = db.Column(db.String(40), nullable=False)
    milk = db.Column(db.String(255), nullable=False)
    flavors = db.Column(db.String(255), nullable=False)
    topping1 = db.Column(db.String(255), nullable=False)
    topping2 = db.Column(db.String(255), nullable=False)
    topping3 = db.Column(db.String(255), nullable=False)
    ice = db.Column(db.String(255), nullable=False)
    sweeteners = db.Column(db.String(255), nullable=False)
    shotOptions = db.Column(db.Integer, nullable=False)
    expressoRoastOptions = db.Column(db.String, nullable=False)
    teaBase = db.Column(db.String, nullable=False)

    # relationship attributes
    cart = db.relationship('Cart', back_populates="orders")
    drink = db.relationship('Drink', back_populates = "orders")


    def to_dict(self):
        return {
            'id': self.id,
            'cart_id':self.cart_id,
            'drink_id' : self.drink_id,
            'size': self.size,
            'milk': self.milk,
            'flavors': self.flavors,
            'topping1':self.topping1,
            'topping2':self.topping2,
            'topping3':self.topping3,
            'ice':self.ice,
            'sweeteners':self.sweeteners,
            'shotOptions': self.shotOptions,
            'expressoRoastOptions': self.expressoRoastOptions,
            'teaBase':self.teaBase
        }