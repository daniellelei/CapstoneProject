from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import customization

class CustomizationForm(FlaskForm):
    drink_id = IntegerField('drinkId', validators=[DataRequired()])
    size = StringField('Size', validators=[DataRequired()])
    milk = SelectField('Milk', choices=['None', 'Whole Milk', '2%', 'HalfNHalf', 'Fat Free'], validators = [DataRequired()])
    shotOptions = IntegerField('Shot options')
    expressoRoastOptions = SelectField('Expresso Roast Options', choices = ['Blonde', 'Medium Roast', 'Dark Roast'])
    submit = SubmitField('Create')

