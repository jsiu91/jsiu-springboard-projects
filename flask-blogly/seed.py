"""Seed file to make sample data for users db."""

from models import User, Post, Tag, PostTag, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()
Post.query.delete()

# Add users
alan = User(first_name='Alan', last_name='Alda')
joel = User(first_name='Joel', last_name='Burton')
jane = User(first_name='Jane', last_name='Smith')

#Add posts
first = Post(title='First Post!', content='Oh hey it is my first post!', user_id=1)
another = Post(title='Yet! Another Post', content='Checkout my 2nd post!', user_id=1)
flask_cool = Post(title='Flask is cool', content='This is such a cool project :)', user_id=1)

#Add Tags
fun = Tag(name="Fun")
more = Tag(name="Even More")
bloop = Tag(name="Bloop")

#Add Post Tags
first_fun = PostTag(post_id=1,tag_id=1)

# Add new objects to session, so they'll persist
db.session.add(alan)
db.session.add(joel)
db.session.add(jane)

db.session.add(first)
db.session.add(another)
db.session.add(flask_cool)

db.session.add(fun)
db.session.add(more)
db.session.add(bloop)

db.session.add(first_fun)

# Commit--otherwise, this never gets saved!
db.session.commit()