from boggle import Boggle
from flask import Flask,render_template, request, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = "shhh_secret_key"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

@app.route('/')
def show_board():
    """Return home template after making a board and session"""
    board = boggle_game.make_board()
    session["board"] = board

    return render_template('home.html', board=board)

@app.route('/guess-word')
def search_word():
    """Search if word is in dictionary."""
    guess = request.args["guess"]
    board = session["board"]
    res = boggle_game.check_valid_word(board, guess)

    return jsonify({'result': res})

@app.route('/done', methods=["POST"])
def get_results():
    """Get score, add number of plays and update high score"""
    score = request.json["score"]
    highscore = session.get("highscore",0)
    num_plays = session.get("num_plays",0)

    session["num_plays"] = num_plays + 1
    session["highscore"] = max(score, highscore)

    return jsonify(newRecord = score > highscore)