from .db import db, environment, SCHEMA, add_prefix_for_prod


class Sweetener(db.Model):
    __tablename__ = 'sweeteners'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    customization_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("customizations.id")), nullable=False)
    sugar = db.Column(db.Integer)
    sugarInTheRaw = db.Column(db.Integer)
    honey = db.Column(db.Integer)
    splenda = db.Column(db.Integer)
    steviaInTheRaw = db.Column(db.Integer)
    classicSyrup = db.Column(db.Integer)
    liquidCaneSugar = db.Column(db.Integer)
    honeyBlend = db.Column(db.Integer)
    

    # relationship attributes
    customization = db.relationship(
        'Customization', back_populates='sweetener')

    def to_dict(self):
        return {
            'id': self.id,
            'customization_id': self.customization_id,
            'sugar': self.sugar,
            'sugarInTheRaw': self.sugarInTheRaw,
            'honey': self.honey,
            'splenda': self.splenda,
            'steviaInTheRaw': self.steviaInTheRaw,
            'classicSyrup': self.classicSyrup,
            'liquidCaneSugar': self.liquidCaneSugar,
            'honeyBlend': self.honeyBlend,
            
        }
