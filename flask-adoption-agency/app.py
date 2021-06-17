"""Adoption Agency application."""
from flask import Flask, render_template,  redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db,  connect_db, Pet
from forms import PetForm


app = Flask(__name__)
app.debug = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pets_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']  =  False
app.config['SQLALCHEMY_ECHO'] =  False
app.config['SECRET_KEY'] = "welovetoadoptpets0099"
app.config['DEBUG_TB_ENABLED'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def show_pets():
    """Show pets list and availability"""
    pets = Pet.query.all()

    return render_template('pets.html', pets=pets)

@app.route('/add', methods=["GET","POST"])
def show_add_pets():
    """Pet add form and handle adding."""

    form = PetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data 
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data

        pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes)
        db.session.add(pet)
        db.session.commit()

        flash(f'{pet.name} added.')
        return redirect('/')
    else:
        return render_template('add_pet.html', form=form)

@app.route('/<int:id>', methods=["GET","POST"])
def show_edit_pet_details(id):
    """Show pet details/handle editing."""

    pet = Pet.query.get_or_404(id)
    form = PetForm(obj=pet)

    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data 
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data

        db.session.commit()

        flash(f'{pet.name} updated.')
        return redirect('/')
    else:
       return render_template('edit_pet.html', form=form) 

