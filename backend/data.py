import firebase_admin
from firebase_admin import credentials, firestore, storage


cred = credentials.Certificate("creds.json")
db = firestore.client()


def __get(coll, doc, field):
    return db.collection(coll).document(doc).get().to_dict()[field]


def login(email, password):
    if not db.collection("Users").document(email).get().exists:
        return None
    if __get("Users", email, "Password") == password:
        return True
    return False


def register(user_obj):
    new_obj = user_obj.jsonify()

