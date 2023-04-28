from .db import db, environment, SCHEMA, add_prefix_for_prod


post_custs = db.Table(
    'post_custs',
    db.Model.metadata,
    db.Column("posts_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod('posts.id')), primary_key=True),
    db.Column("customizations_id", db.Integer, db.ForeignKey(
        add_prefix_for_prod('customizations.id')), primary_key=True)
)
if environment == "production":
    post_custs.schema = SCHEMA
