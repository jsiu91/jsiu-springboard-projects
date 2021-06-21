"""Flask app for Cupcakes"""
from flask import Flask, json, render_template,  redirect, flash, jsonify, request
from models import db,  connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']  =  False
app.config['SQLALCHEMY_ECHO'] =  False
app.config['SECRET_KEY'] = "the_most_delicious_cupcakes_in_town"


connect_db(app)
db.create_all()

def serialize_cupcake(cupcake):
    """Serialize a cucpcake."""

    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image": cupcake.image
    }

@app.route('/')
def show_cupcakes():
    """Render the homepage."""

    return render_template('cupcakes.html')

@app.route('/api/cupcakes')
def list_all_cupcakes():
    """Get data about all cupcakes. 
    Return JSON {cupcakes: [{id, flavor, size, rating, image}, ...]}
    """

    cupcakes = Cupcake.query.all()
    serialized = [serialize_cupcake(c) for c in cupcakes]

    return jsonify(cupcakes=serialized)

@app.route('/api/cupcakes/<int:cid>')
def get_cupcake(cid):
    """Get data about a single cupcake. 
    Return JSON {cupcake: {id, flavor, size, rating, image}}.
    """

    cupcake = Cupcake.query.get_or_404(cid)
    serialized = serialize_cupcake(cupcake)

    return jsonify(cupcake=serialized)

@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    """Create a cupcake with flavor, size, rating, and image data 
    from the body of the request.
    Return JSON {cupcake: {id, flavor, size, rating, image}}.
    """

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json["image"]

    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = serialize_cupcake(new_cupcake)

    return (jsonify(cupcake=serialized),201)

@app.route('/api/cupcakes/<int:cid>', methods=['PATCH'])
def update_cupcake(cid):
    """Update a cupcake with the id passed in the URL
    Return JSON {cupcake: {id, flavor, size, rating, image}} 
    """
    cupcake = Cupcake.query.get_or_404(cid)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)

    db.session.commit()

    serialized = serialize_cupcake(cupcake)

    return jsonify(cupcake=serialized)

@app.route('/api/cupcakes/<int:cid>', methods=['DELETE'])
def delete_cupcake(cid):
    """Delete a cupcake with the id passed in the URL
    Return JSON {message: "Deleted"}
    """
    cupcake = Cupcake.query.get_or_404(cid)
    
    db.session.delete(cupcake)
    db.session.commit()
    
    return jsonify(message="Deleted")
