from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import customization

class CustomizationForm(FlaskForm):
    drink_id = IntegerField('drink_id', validators=[DataRequired()])
    size = StringField('size', validators=[DataRequired()])
    milk = SelectField('milk', choices=['None', 'Whole Milk', '2%', 'HalfNHalf', 'Fat Free'], validators = [DataRequired()])
    shotOptions = IntegerField('shotOptions')
    expressoRoastOptions = StringField('expressoRoastOptions')
    toppings = StringField('toppings')
    flavors = StringField('flavors')
    addIns = StringField('addIns')
    sweeteners = StringField('sweeteners')
    teaBase = StringField('teaBase')
    submit = SubmitField('Create')

