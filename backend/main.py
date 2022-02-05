from flask import Flask, request, redirect, url_for


M = ["GET", "POST"]  # GET and POST methods for app routes


app = Flask(__name__)


@app.route("/")
def index():
    return "Welcome to the ReFriender API!"


@app.route("/login", methods=M)
def login():
    if request.method == "POST":
        # Do login stuff
        return ""
    return ""


@app.route("/register", methods=M)
def register():
    if request.method == "POST":
        # Do register stuff
        return ""
    return ""


@app.route("/facebook-callback")
def facebook():
    # Do facebook stuff
    return ""


@app.route("/user")
def user():
    return ""  # User data


@app.route("/nextselection")
def home():
    return ""  # Next Selection


if __name__ == "__main__":
    app.run(debug=True)
