"""Models for Cupcake app."""
from collections import defaultdict
from typing import Sized
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """Cupcake Model"""

    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    flavor = db.Column(db.Text, nullable=False)

    size = db.Column(db.Text, nullable=False)

    rating = db.Column(db.Float, nullable=False)
    
    image = db.Column(db.Text, default="https://tinyurl.com/demo-cupcake")




