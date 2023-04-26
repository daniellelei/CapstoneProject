# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .cart_paid_ordered_drinks import cart_paid_ordered_drinks
# class Cart_paid (db.Model):
#     __tablename__ = 'cart_paids'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(
#         db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
#     )
#     total_price = db.Column(db.Integer)
#     # ordered_drink_id = db.Column(
#     #     db.Integer, db.ForeignKey(add_prefix_for_prod("ordered_drinks.id")), nullable=True
#     # )
#     drinks = db.Column(db.String(255), nullalbe = True)
#     customizations = db.Column
#     cart_id = db.Column(
#         db.Integer, db.ForeignKey(add_prefix_for_prod("carts.id")), nullable=False
#     )
#     cart = db.relationship(
#         'Cart',
#         back_populates = 'cart_paid'
#     )
    

#     # ordered_drinks = db.relationship(
#     #     'Ordered_drink',
#     #     secondary = cart_paid_ordered_drinks,
#     #     back_populates = 'cart_paid'
#     # )

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'total_price': self.total_price,
#             "cart_id":self.cart_id
#         }
