from ...models.db import db, environment, SCHEMA, add_prefix_for_prod

class Flavor(db.Model):
    __tablename__ = 'flavors'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    customization_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("customizations.id")), nullable=False)
    brownSugarSyrup = db.Column(db.Integer)
    caramelSyrup = db.Column(db.Integer)
    cinnamonDolceSyrup = db.Column(db.Integer)
    hazelnulSyrup = db.Column(db.Integer)
    peppermintSyrup = db.Column(db.Integer)
    raspberrySyrup = db.Column(db.Integer)
    toastedVanillaSyrup = db.Column(db.Integer)
    toffeenutSyrup = db.Column(db.Integer)
    vanillaSyrup = db.Column(db.Integer)
    sugarFreeVanillaSyrup = db.Column(db.Integer)
    mochaSauce = db.Column(db.Integer)
    newDarkCaramelSauce = db.Column(db.Integer)
    pistachioSauce = db.Column(db.Integer)
    whiteChocolateMochaSauce = db.Column(db.Integer)

    # relationship attributes
    customization = db.relationship('Customization', back_populates='flavor')


    def to_dict(self):
        return {
            'id': self.id,
            'customization_id': self.customization_id,
            'brownSugarSyrup': self.brownSugarSyrup,
            'caramelSyrup': self.caramelSyrup,
            'cinnamonDolceSyrup': self.cinnamonDolceSyrup,
            'hazelnulSyrup': self.hazelnulSyrup,
            'peppermintSyrup': self.peppermintSyrup,
            'raspberrySyrup': self.raspberrySyrup,
            'toastedVanillaSyrup': self.toastedVanillaSyrup,
            'toffeenutSyrup': self.toffeenutSyrup,
            'vanillaSyrup': self.vanillaSyrup,
            'sugarFreeVanillaSyrup': self.sugarFreeVanillaSyrup,
            'mochaSauce': self.mochaSauce,
            'newDarkCaramelSauce': self.newDarkCaramelSauce,
            'pistachioSauce': self.pistachioSauce,
            'whiteChocolateMochaSauce': self.whiteChocolateMochaSauce
        }
