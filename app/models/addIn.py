from .db import db, environment, SCHEMA, add_prefix_for_prod


class AddIn(db.Model):
    __tablename__ = 'addIns'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    customization_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("customizations.id")), nullable=False)
    chocolateMaltPowder = db.Column(db.String(255))
    vanillaBeanPowder = db.Column(db.Integer)
    ice = db.Column(db.String(255))
    lineTheCup = db.Column(db.String(255))
    room = db.Column(db.String(255))
    creamer = db.Column(db.String(255))
    

    # relationship attributes
    customization = db.relationship('Customization', back_populates='addIns')

    def to_dict(self):
        return {
            'id': self.id,
            'customization_id': self.customization_id,
            'chocolateMaltPowder': self.chocolateMaltPowder,
            'vanillaBeanPowder': self.vanillaBeanPowder,
            'ice': self.ice,
            'lineTheCup': self.lineTheCup,
            'room': self.room,
            'creamer': self.creamer,
        }
