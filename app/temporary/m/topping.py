from ...models.db import db, environment, SCHEMA, add_prefix_for_prod


class Topping(db.Model):
    __tablename__ = 'toppings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    customization_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("customizations.id")), nullable=False)
    caramelCrunchTopping = db.Column(db.String(255))
    cookieCrumbleTopping = db.Column(db.String(255))
    saltedBrownButterTopping = db.Column(db.String(255))
    cinnamonDolceSprinkles = db.Column(db.String(255))
    caramelDrizzle = db.Column(db.String(255))
    mochaDrizzle = db.Column(db.String(255))
    chocolateCreamColdFoam = db.Column(db.String(255))
    cinnamonSweetCreamColdFoam = db.Column(db.String(255))
    pistachioCreamColdFoam = db.Column(db.String(255))
    saltedCaramelCreamColdFoam = db.Column(db.String(255))
    vanillaSweetCreamColdFoam = db.Column(db.String(255))
    cinnamonPowder = db.Column(db.String(255))
    whippedCream = db.Column(db.String(255))
    

    # relationship attributes
    customization = db.relationship('Customization', back_populates='topping')

    def to_dict(self):
        return {
            'id': self.id,
            'customization_id': self.customization_id,
            'caramelCrunchTopping': self.caramelCrunchTopping,
            'cookieCrumbleTopping': self.cookieCrumbleTopping,
            'saltedBrownButterTopping': self.saltedBrownButterTopping,
            'cinnamonDolceSprinkles': self.cinnamonDolceSprinkles,
            'caramelDrizzle': self.caramelDrizzle,
            'mochaDrizzle': self.mochaDrizzle,
            'chocolateCreamColdFoam': self.chocolateCreamColdFoam,
            'cinnamonSweetCreamColdFoam': self.cinnamonSweetCreamColdFoam,
            'pistachioCreamColdFoam': self.pistachioCreamColdFoam,
            'saltedCaramelCreamColdFoam': self.saltedCaramelCreamColdFoam,
            'vanillaSweetCreamColdFoam': self.vanillaSweetCreamColdFoam,
            'cinnamonPowder': self.cinnamonPowder,
            'whippedCream': self.whippedCream,
            
        }
