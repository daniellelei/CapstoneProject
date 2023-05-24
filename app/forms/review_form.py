from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class ReviewForm (FlaskForm):
    reviewBody = StringField('reviewBody', validators=[DataRequired(), Length(min=3, 
                                                                              message = 'Review content needs to be at least 3 characters long.')])
    submit = SubmitField('Save Review')