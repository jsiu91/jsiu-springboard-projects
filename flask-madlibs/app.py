from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import story

app = Flask(__name__)
app.config['SECRET_KEY'] = 'big-secret'

debug = DebugToolbarExtension(app)

@app.route('/')
def create_story():
    """Generate input values for the prompt."""
    prompts = story.prompts

    return render_template("home.html", prompts=prompts)

@app.route('/story')
def show_story():
    """Show the story result."""
    text = story.generate(request.args)

    return render_template("story.html", text=text)