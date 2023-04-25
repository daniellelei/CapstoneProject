from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, EmailField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = EmailField('email', validators=[DataRequired(
    ), user_exists, Email(message="Please provide a valid email.")])
    password = StringField('password', validators=[DataRequired()])
    funds = DecimalField('funds'
                        , places=2
                        , validators=[DataRequired()
                        , NumberRange(min=1, message="Please have at least $1.")])