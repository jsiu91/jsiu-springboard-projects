"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from datetime import datetime

db = SQLAlchemy()

DEFAULT_IMAGE_URL = "https://image.flaticon.com/icons/png/512/1177/1177568.png"

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    """User Model"""
    __tablename__ = 'users'

    id = db.Column(db.Integer,
                    primary_key= True,
                    autoincrement=True)
    
    first_name = db.Column(db.Text,
                            nullable = False)

    last_name = db.Column(db.Text,
                            nullable = False)
    
    image_url = db.Column(db.Text,
                        nullable = False,
                        default = DEFAULT_IMAGE_URL)

    def full_name(self):
        """Return full name of user"""

        return f"{self.first_name} {self.last_name}"
    
    def __repr__(self):
        return '<User %r>' % self.full_name()

class Post(db.Model):
    """Post Model"""
    __tablename__ = 'posts'

    id = db.Column(db.Integer,
                    primary_key=True,
                    autoincrement=True)

    title = db.Column(db.Text,
                        nullable=False)

    content = db.Column(db.Text, 
                        nullable=False)

    create_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    user = db.relationship('User', backref='posts')

    post_tags = db.relationship('PostTag', backref='posts')

    tags = db.relationship('Tag', secondary='posttags', backref='posts')

    def __repr__(self):
        return '<Post %r>' % self.title

class PostTag(db.Model):
    """PostTag Model"""
    __tablename__ = 'posttags'

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'),
                        primary_key=True,
                        nullable=False)
    
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'),
                     primary_key=True,
                     nullable=False)

class Tag(db.Model):
    """Tag Model"""
    __tablename__ = 'tags'

    id = db.Column(db.Integer,
                    primary_key=True,
                    autoincrement=True)

    name = db.Column(db.Text,
                    nullable=False,
                    unique=True)

    post_tags = db.relationship('PostTag', backref='tags')