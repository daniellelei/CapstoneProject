from .db import db


post_custs = db.Table(
    'post_custs',
    db.Model.metadata,
    db.Column("posts_id", db.Integer, db.ForeignKey(
        'posts.id'), primary_key=True),
    db.Column("customizations_id", db.Integer, db.ForeignKey(
        'customizations.id'), primary_key=True)
)
