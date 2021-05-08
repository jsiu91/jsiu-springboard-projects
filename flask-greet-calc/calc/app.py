from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route('/add', methods=['GET'])
def to_add():
    """Add a and b params"""
    a = int(request.args.get("a", 1))
    b = int(request.args.get("b", 1))
    res = add(a,b)

    return f"The sum of a and b is: {res}"

@app.route('/sub', methods=['GET'])
def to_sub():
    """Subtract a and b params"""
    a = int(request.args.get("a", 1))
    b = int(request.args.get("b", 1))
    res = sub(a,b)

    return f"The subtraction of a and b is: {res}"

@app.route('/mult', methods=['GET'])
def to_mult():
    """Multiply a and b params"""
    a = int(request.args.get("a", 1))
    b = int(request.args.get("b", 1))
    res = mult(a,b)

    return f"The multiplication of a and b is: {res}"

@app.route('/div', methods=['GET'])
def to_div():
    """Divide a and b params"""
    a = int(request.args.get("a", 1))
    b = int(request.args.get("b", 1))
    res = div(a,b)

    return f"The division of a and b is: {res}"

operators = {
    "add": add,
    "sub": sub,
    "mult": mult,
    "div": div,
}

@app.route('/math/<op>')
def to_math(op):
    """Do the math operation for a and b"""
    a = int(request.args.get("a", 1))
    b = int(request.args.get("b", 1))
    res = operators[op](a,b)

    return f"The {op} of a and b is: {res}"
