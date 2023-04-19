from .db import db, environment, SCHEMA, add_prefix_for_prod

class Order (db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
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

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'price': self.price
        }