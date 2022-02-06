from flask import Flask, request, redirect, url_for
from flask_cors import CORS

from data import User
from data import login as l, register as r, get_user as gu, update_user as uu, get_near_users as gnu, get_old_contacts as goc, get_chats as gc, get_messages as gm, send_message as sm, get_old_contacts as goc


P = ["POST"]  # POST only for app routes
B = ["GET", "POST"]  # Both GET and POST for app routes


app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "Welcome to the ReFriender API!"


@app.route("/login", methods=P)
def login():
    d = request.json
    status = l(d.get("email"), d.get("password"))
    if status is None:
        return {"result": "This user does not exist", "status": False}
    elif status is False:
        return {"result": "Incorrect password", "status": False}
    else:
        return {"result": status, "status": True}  # User object


@app.route("/register", methods=P)
def register():
    d = request.json
    usr = User(
        d.get("email"),
        d.get("email"),
        d.get("password"),
        d.get("firstName"),
        d.get("lastName"),
        d.get("zipCode"),
        d.get("highSchool"),
        d.get("middleSchool"),
        d.get("yearOfBirth")
    )
    status = r(usr)
    if status is False:
        return {"result": "Someone is already registered with this email!", "status": False}
    else:
        return {"result": status, "status": True}  # User object


@app.route("/profilechange", methods=P)
def update_profile():
    d = request.json
    status = uu(d.get("userID"), d.get("firstName"), d.get("lastName"), d.get("zipCode"), d.get("highSchool"), d.get("middleSchool"))
    if status is False:
        return {"result": "This user does not exist", "status": False}
    return {"result": status, "status": True}


@app.route("/profile/<email>")
def get_profile(email):
    status = gu(email)
    if status is False:
        return {"result": "This user does not exist", "status": False}
    return {"result": status, "status": True}


@app.route("/suggestions/<email>")
def suggestions(email):
    # status = gnu(User(**gu(email)))
    status = goc(User(**gu(email)))
    if status is False:
        return {"result": "User does not exist", "status": False}
    return {"result": status, "status": True}


@app.route("/chats", methods=P)
def chats():
    status = gc(request.json.get("email"))
    if status is False:
        return {"result": "No chats available", "status": False}
    return {"result": [gu(x) for x in status], "status": True}


@app.route("/messages", methods=P)
def messages():
    d = request.json
    status = gm(d.get("sender"), d.get("receiver"))
    if status is False:
        return {"result": "At least one of these users doesn't exist", "status": False}
    return {"result": status, "status": True}


@app.route("/send", methods=P)
def send():
    d = request.json
    status = sm(d.get("sender"), d.get("receiver"), d.get("message"))
    if status is False:
        return {"result": "At least one of these users doesn't exist", "status": False}
    return {"result": status, "status": True}


if __name__ == "__main__":
    app.run(debug=True)
