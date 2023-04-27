from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, URL



class PostForm(FlaskForm):
    caption = StringField("Caption", validators=[DataRequired(), Length(
        min=5, message="Post captions must be at least 5 characters")])
    image = StringField("Post Image URL", validators=[DataRequired(), URL()])
    customization_id = IntegerField('customization_id', validators=[DataRequired()])
    submit = SubmitField("Save Post")
