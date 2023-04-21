from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import cart

class CartForm(FlaskForm):
    total_price = IntegerField('drink_id', validators=[DataRequired()])  
    submit = SubmitField('Create')
