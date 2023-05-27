from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length

class CommentForm (FlaskForm):
    commentBody = StringField('commentBody', validators=[DataRequired(), Length(min=3, 
                                                                              message = 'comment content needs to be at least 3 characters long.')])
    
    submit = SubmitField('Save comment')