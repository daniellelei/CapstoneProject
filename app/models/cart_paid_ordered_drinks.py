from .db import db, SCHEMA, environment, add_prefix_for_prod

cart_paid_ordered_drinks = db.Table(
    "cart_paid_ordered_drink",
    db.Model.metadata,
    db.Column("cart_paid_id", db.ForeignKey(
        add_prefix_for_prod("cart_paids.id"))),
    db.Column("ordered_drink_id", db.ForeignKey(
        add_prefix_for_prod("ordered_drinks.id")))
)

if environment == "production":
    cart_paid_ordered_drinks.schema = SCHEMA
