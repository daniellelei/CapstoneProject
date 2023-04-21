from .db import db, environment, SCHEMA, add_prefix_for_prod

cart_customizations = db.Table(
    "cart_customizations",
    db.Model.metadata,
    db.Column('cart_id', db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id'))),
    db.Column("customization_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod("customizations.id")))
)

if environment == "production":
    cart_customizations.schema = SCHEMA
