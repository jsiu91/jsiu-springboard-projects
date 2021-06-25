from flask import Flask, render_template, redirect, session, flash
from models import connect_db, db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///users_feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "abc123"

connect_db(app)
db.create_all()

@app.route('/')
def redirect_to_register():
    """Home page redirect to /register"""
    return redirect('/register')

@app.route('/register', methods=['GET', 'POST'])
def register_form():
    """Show register form; Process user registration"""
    form = RegisterForm()

    if form.validate_on_submit():
        username = form.username.data
        pwd = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        new_user = User.register(username, pwd, email, first_name, last_name)

        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.error_append('Username taken. Please pick another')
            return render_template('register.html', form=form)  

        session['user_username'] = new_user.username
        flash("Welcome! Successfully Created Your Account!", "success")
        return redirect(f'/users/{username}')

    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login_user():
    """Show login form; Allow access to registration"""
    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        pwd = form.password.data

        user = User.authenticate(username, pwd)
        if user:
            flash(f"Welcome Back, {user.username}!", "primary")
            session["user_username"] = user.username
            return redirect(f'/users/{username}')
        else:
            form.username.errors = ["Wrong username/password"]

    return render_template('login.html',form=form)

@app.route('/users/<username>', methods=['GET'])
def show_user(username):
    """Show users information."""
    if "user_username" not in session:
        flash("You must be logged in to view!", "danger")
        return redirect('/login')
    else:
        user = User.query.filter_by(username=username).first()
        return render_template('user.html',user=user)

@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    """Remove user and delete all feedback."""
    user = User.query.get_or_404(username)

    if "user_username" not in session or session["user_username"] != user.username:
        flash("You must be logged in to delete!", "danger")
        return redirect(f'/users/{user.username}')

    else:
        db.session.delete(user)
        db.session.commit()

        session.pop('user_username')

        flash(f"User {user.username} has been deleted")
        return redirect('/')


@app.route('/users/<username>/feedback/add', methods=['GET','POST'])
def add_feedback(username):
    """Show feedback form and process information."""
    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        new_feedback = Feedback(title=title, content=content, username=username)

        db.session.add(new_feedback)
        db.session.commit()

        flash("New Feedback Created", "success")
        return redirect(f'/users/{username}')

    return render_template('feedback.html', form=form , username = username)

@app.route('/feedback/<int:feedbackId>/update', methods=['GET','POST'])
def update_feedback(feedbackId):
    """Show edit form and update specific piece of feedback."""
    feedback = Feedback.query.get_or_404(feedbackId)
    username = feedback.username
    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        
        feedback.title = title
        feedback.content = content
        
        db.session.commit()
        return redirect(f'/users/{username}')

    return render_template('edit_feedback.html', form=form ,username=username)

@app.route('/feedback/<int:feedbackId>/delete', methods=['POST'])
def delete_feedback(feedbackId):
    """Delete feedback."""
    feedback = Feedback.query.get_or_404(feedbackId)
    username = feedback.username

    db.session.delete(feedback)
    db.session.commit()

    flash("Feedback Deleted", "danger")
    return redirect(f'/users/{username}')

@app.route('/logout', methods=['POST'])
def logout_user():
    """Clears session data and redirect to /."""
    session.pop("user_username")
    return redirect('/')