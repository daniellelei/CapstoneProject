from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import customization

class CustomizationForm(FlaskForm):
    drink_id = IntegerField('drink_id', validators=[DataRequired()])
    cart_id = IntegerField('cart_id', validators=[DataRequired()])
    size = StringField('size', validators=[DataRequired()])
    milk = SelectField('milk', choices=['None', 'Whole Milk', '2%', 'HalfNHalf', 'Fat Free'], validators = [DataRequired()])
    shotOptions = IntegerField('shotOptions')
    expressoRoastOptions = StringField('expressoRoastOptions')
    submit = SubmitField('Create')

