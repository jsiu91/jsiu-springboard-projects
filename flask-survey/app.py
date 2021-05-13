from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config["SECRET_KEY"] = "This_is_a_super_cool_key"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

@app.route('/')
def create_survey():
    """Return title and instructions from surveys class"""
    prompts = satisfaction_survey

    return render_template('home.html', prompts=prompts)

@app.route('/start', methods=['POST'])
def start_survey():
    """Creates an empty array of session"""
    session["responses"] = []

    return redirect("/questions/0")

@app.route('/questions/<int:id>')
def create_questions(id):
    """Return questions based on the responses or redirect if there are no more questions"""
    responses = session["responses"]
    # Redirect to thank you page if no more questions
    if len(responses) == len(satisfaction_survey.questions):
        return redirect ('/thankyou')
    # Redirect to actual question id when out of order
    if len(responses) != id:
        flash("Invalid URL")
        return redirect(f"/questions/{len(responses)}")

    # Send survey question and choice to render on template
    survey_question =  satisfaction_survey.questions[id].question
    choices = satisfaction_survey.questions[id].choices

    return render_template('questions.html',survey_question=survey_question, choices=choices)

@app.route('/questions/submit', methods=["POST"])
def send_answers():
    """Adds response to the session and return to the next question"""
    ans = request.form["choice"]

    responses = session["responses"]
    responses.append(ans)
    session["responses"] = responses

    return redirect(f"/questions/{len(responses)}")

@app.route('/thankyou')
def ty_message():
    """Return thank you message after finishing the survey"""
    return render_template('thank_you.html')