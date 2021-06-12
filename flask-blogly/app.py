"""Blogly application."""

from operator import methodcaller
from os import get_inheritable
from re import A
from typing import Callable
from flask import Flask, request, render_template,  redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from models import db,  connect_db, User, Post, Tag, PostTag

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///users_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']  =  False
app.config['SQLALCHEMY_ECHO'] =  False
app.config['SECRET_KEY'] = "usersarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route('/')
def redirect_users():
    """Show list of all users in db"""
    return redirect('/users')

@app.route('/users')
def list_users():
    """Show list of all users in db"""
    users = User.query.all()
    return render_template('list.html', users = users)

@app.route('/users/new')
def create_users():
    """Show an add form for users"""
    return render_template('create_user.html')

@app.route('/users/new', methods=['POST'])
def add_user():
    """Process the add form, adding a new user and going back to /users"""
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']

    user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(user)
    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>')
def show_user(user_id):
    """Show information about the given user"""
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(user_id=user_id).all()
    return render_template('details.html', user=user, posts=posts)

@app.route('/users/<int:user_id>/edit')
def show_edit_user(user_id):
    """Show the edit page for a user"""
    user = User.query.get_or_404(user_id)
    return render_template('edit_user.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def edit_user(user_id):
    """Process the edit form, returning the user to the /users page"""
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']
    user = User.query.get_or_404(user_id)

    user.first_name = first_name
    user.last_name = last_name
    user.image_url = image_url

    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    """Delete the user"""
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect('/users')

@app.route('/users/<int:user_id>/posts/new')
def show_add_post(user_id):
    """Show form to add a post for that user"""
    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()
    return render_template('create_post.html', user=user, tags=tags)

@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def add_post(user_id):
    """Handle add form; add post and redirect to the user detail page"""
    title = request.form['title']
    content = request.form['content']
    selected = request.form.getlist('check')

    post = Post(title=title, content=content, user_id=user_id)
    db.session.add(post)
    db.session.commit()


    for tag in selected:
        post_tags = PostTag(post_id=post.id, tag_id=int(tag))
        db.session.add(post_tags)

    db.session.commit()
   
    return redirect(f'/users/{user_id}')

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    """Show post content"""
    post = Post.query.get_or_404(post_id)
    tags = post.tags
    return render_template('post_detail.html', post=post, tags=tags)

@app.route('/posts/<int:post_id>/edit')
def show_edit_post(post_id):
    """Show form to edit a post"""
    post = Post.query.get_or_404(post_id)
    tags = Tag.query.all()

    return render_template('edit_post.html', post=post, tags=tags)

@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def edit_post(post_id):
    """Handle editing of a post. Redirect back to the post view"""
    title = request.form['title']
    content = request.form['content']
    post = Post.query.get_or_404(post_id)

    post.title = title
    post.content = content

    db.session.commit()

    return redirect(f'/posts/{post_id}')

@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    """Delete the post"""
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()

    return redirect('/users')

@app.route('/tags')
def list_tags():
    """List all tags"""
    tags = Tag.query.all()
    return render_template('list_tags.html', tags=tags)

@app.route('/tags/new')
def new_tag():
    """Show form to add a new tag"""
    return render_template('create_tag.html')

@app.route('/tags/new', methods=['POST'])
def create_new_tag():
    """Process add form, redirects to tag list"""
    name = request.form['name']

    tag = Tag(name=name)
    db.session.add(tag)
    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    """Show detail about a tag"""
    tag = Tag.query.get_or_404(tag_id)
    posts = tag.posts

    return render_template('tag_details.html', tag=tag, posts=posts)

@app.route('/tags/<int:tag_id>/edit')
def show_edit_tag(tag_id):
    """Show edit form for a tag"""
    tag = Tag.query.get_or_404(tag_id)

    return render_template('edit_tag.html', tag=tag)

@app.route('/tags/<int:tag_id>/edit', methods=['POST'])
def edit_tag(tag_id):
    """Process edit form, redirects to the tags list"""
    tag = Tag.query.get_or_404(tag_id)
    name = request.form['name']

    tag.name = name

    db.session.commit()

    return redirect('/tags')

@app.route('/tags/<int:tag_id>/delete', methods=['POST'])
def delete_tag(tag_id):
    """Delete a tag"""
    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()

    return redirect('/tags')