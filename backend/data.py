from dataclasses import asdict

import firebase_admin
from firebase_admin import credentials, firestore, storage

from user import User

cred = credentials.Certificate("creds.json")
db = firestore.client()


def __get(coll: str, doc: str, field: str):
    return db.collection(coll).document(doc).get().to_dict()[field]


def login(email: str, password: str):
    if not db.collection("Users").document(email).get().exists:
        return None
    if __get("Users", email, "Password") == password:
        return db.collection("Users").document(email).get().to_dict()
    return False


def register(user: User):
    if db.collection("Users").document(user.uid).get().exists:
        return False
    db.collection("Users").document(user.uid).set(asdict(user))


def get_user(uid):
    if db.collection("Users").document(uid).get().exists:
        return User(**db.collection("Users").document(uid).get().to_dict())
    return False


def update_user(user: User):
    if db.collection("Users").document(user.uid).get().exists:
        db.collection("Users").document(user.uid).update(asdict(user))
    return False


def get_messages(u1: int, u2: int):
    larger = u1 if u1 > u2 else u2
    smaller = u2 if u1 > u2 else u1
    query = db.collection("Messages") \
        .where("LargerUID", "==", larger) \
        .where("SmallerUID", "==", smaller) \
        .order_by("Timestamp", firestore.Query.DESCENDING) \
        .limit(50) \
        .stream()
    return [x.to_dict() for x in query]


def send_message(sender: int, receiver: int, message: str):
    larger = sender if sender > receiver else receiver
    smaller = receiver if sender > receiver else sender
    lastid = db.collection("Messages").order_by("ID", firestore.Query.DESCENDING).limit(1).stream()[0].id
    db.collection("Messages").document(lastid + 1).set({
        "LargerUID": larger,
        "SmallerUID": smaller,
        "Timestamp": firestore.SERVER_TIMESTAMP,
        "Sender": sender,
        "Receiver": receiver,
        "Message": message
    })
