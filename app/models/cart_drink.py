from .db import db, SCHEMA, environment, add_prefix_for_prod

cart_drinks = db.Table(
    "cart_drink",
    db.Model.metadata,
    db.Column("cart_id", db.ForeignKey(add_prefix_for_prod("carts.id")), primary_key=True),
    db.Column("drink_id", db.ForeignKey(add_prefix_for_prod("drinks.id")), primary_key=True)
)

if environment == "production":
    user_pins.schema = SCHEMA

