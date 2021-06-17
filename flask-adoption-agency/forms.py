from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import InputRequired, Optional, URL, AnyOf

class PetForm(FlaskForm):
    """Form for adding Pets."""
    spes = ['cat', 'dog', 'porcupine']

    name = StringField("Name", validators=[InputRequired()])
    species = SelectField("Species", choices=[(s,s) for s in spes])
    photo_url = StringField("Photo URL", validators=[Optional(), URL(message="Please enter a valid URL")])
    age = IntegerField("Age", validators=[AnyOf(values=[n for n in range(31)] , message="Age should be between 0-30")])
    notes = StringField("Notes")