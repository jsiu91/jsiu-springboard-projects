from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class User(db.Model):
    """User Model."""

    __tablename__ = "users"

    username = db.Column(db.String(20), nullable= False, primary_key=True, unique=True)
    
    password = db.Column(db.String, nullable=False)
    
    email = db.Column(db.String(50), nullable=False, unique=True)
    
    first_name = db.Column(db.String(30), nullable=False)
    
    last_name = db.Column(db.String(30), nullable=False)

    feedback = db.relationship('Feedback', backref='user', cascade='all, delete')

    @classmethod
    def register(cls, username, password, email, first_name, last_name):
        """Register user w/hashed password & return user."""
        
        hashed = bcrypt.generate_password_hash(password)

        hashed_utf8 = hashed.decode("utf8")

        return cls(username=username, password=hashed_utf8, email=email, 
        first_name=first_name, last_name=last_name)

    @classmethod
    def authenticate(cls, username, password):
        """Validate that user exists & password is correct.

        Return user if valid; else return False.
        """
        
        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return False

class Feedback(db.Model):
    """Feedback Model."""
    
    __tablename__ = "feedbacks"

    id = db.Column(db.Integer, unique=True, primary_key=True, autoincrement=True)

    title = db.Column(db.String(100), nullable=False)

    content = db.Column(db.String, nullable=False)
    
    username = db.Column(db.String(20), db.ForeignKey('users.username'), nullable=False)

    