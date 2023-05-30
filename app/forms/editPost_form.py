from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SelectField, StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, URL


class EditPostForm (FlaskForm):
    caption = StringField("Caption", validators=[DataRequired(), Length(
        min=5, message="Post captions must be at least 5 characters")])
    chosenCust = StringField("chosenCust")
    submit = SubmitField("Save Post")
