from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)
app.config["SECRET_KEY"] = "This_is_a_super_cool_key"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

responses = []
# ['Yes', 'No', 'Less than $10,000', 'Yes']

@app.route('/')
def create_survey():
    """Return title and instructions from surveys class"""
    prompts = satisfaction_survey
    id = int(len(responses))

    return render_template('home.html', prompts=prompts, id=id)

@app.route('/questions/<int:id>')
def create_questions(id):
    """Return questions based on the responses or redirect if there are no more questions"""

    # Redirect to thank you page if no more questions
    if len(responses) == len(satisfaction_survey.questions):
        return redirect ('/thankyou')
    # Redirect to actual question id when out of order
    if len(responses) != id:
        flash("Invalid URL")
        return redirect(f"/questions/{len(responses)}")


    survey_question =  satisfaction_survey.questions[id].question
    choices = satisfaction_survey.questions[id].choices

    return render_template('questions.html',survey_question=survey_question, choices=choices)

@app.route('/questions/submit', methods=["POST"])
def send_answers():
    ans = request.form["choice"]
    responses.append(ans)

    return redirect(f"/questions/{len(responses)}")

@app.route('/thankyou')
def ty_message():
    return render_template('thank_you.html')