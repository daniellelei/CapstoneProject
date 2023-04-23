from .db import db, SCHEMA, environment, add_prefix_for_prod


cart_drinks = db.Table(
    "cart_drink",
    db.Model.metadata,
    db.Column("cart_id", db.ForeignKey(add_prefix_for_prod("carts.id"))),
    db.Column("drink_id", db.ForeignKey(add_prefix_for_prod("drinks.id")))
)

if environment == "production":
    cart_drinks.schema = SCHEMA

