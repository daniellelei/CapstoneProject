from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

class ReviewForm (FlaskForm):
    reviewBody = StringField('reviewBody', validators=[DataRequired(), Length(min=3, 
                                                                              message = 'Review content needs to be at least 3 characters long.')])
    rating = IntegerField('rating', validators=[DataRequired()])
    submit = SubmitField('Save Review')