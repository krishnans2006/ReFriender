from flask import Flask, request, redirect, url_for

from user import User
from data import login as l, register as r, get_user as gu, update_user as uu, get_messages as gm, send_message as sm


P = ["POST"]  #  POST only for app routes


app = Flask(__name__)


@app.route("/")
def index():
    return "Welcome to the ReFriender API!"


@app.route("/login", methods=P)
def login():
    d = request.json
    status = l(d.get("email"), d.get("password"))
    if status is None:
        return {"result": "This user does not exist"}
    elif status is False:
        return {"result": "Incorrect password"}
    else:
        return {"result": status}  # User object


@app.route("/register", methods=P)
def register():
    d = request.json
    status = r(
        d.get("firstName"),
        d.get("lastName"),
        d.get("email"),
        d.get("password"),
        d.get("facebook"),
        d.get("highSchool"),
        d.get("middleSchool"),
        d.get("city"),
        d.get("country")
    )
    if status is False:
        return {"result": "Someone is already registered with this email!"}
    else:
        return {"result": status}  # User object

"""
POST /login {email, password}
POST /register {all data}
GET /profile {uid}
POST /profile {user}
POST /chats {uid}
POST /messages {uid1, uid2}
POST /send {uid1, uid2, message}
"""


if __name__ == "__main__":
    app.run(debug=True)
