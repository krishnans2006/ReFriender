from dataclasses import dataclass, field, asdict
from typing import Optional
import operator

import firebase_admin
from firebase_admin import credentials, firestore


@dataclass
class User:
    uid: str
    email: str
    password: str
    first_name: str
    last_name: str
    zip_code: str
    high_school: Optional[str] = ''
    middle_school: Optional[str] = ''
    year_of_birth: Optional[str] = ''
    profile_image_URL: Optional[str] = ''
    first_contact: list = field(default_factory=list)
    confirmed_old_contact: Optional[list] = field(default_factory=list)
    never_contact: Optional[list] = field(default_factory=list)

    """
    berke = User("idberke", "Berke", "Altiparmak", "Turkey", "Istanbul")
    arihan = User("idarihan", "name1", "surname1", "country1", "city1")
    esam = User("idesam", "name2", "surname2", "country2", "city2")
    ronaldo = User("idronaldo", "name3", "surname3", "country3", "city3")
    messi = User("idmessi", "name4", "surname4", "country4", "city4")
    descartes = User("iddescartes", "name5", "surname5", "country5", "city5")
    churchill = User("idchurchill", "name6", "surname6", "country6", "city6")
    einstein = User("ideinstein", "name7", "surname7", "country7", "city7")
    churchill.add_first_contact(einstein)
    churchill.add_first_contact(descartes)
    messi.add_first_contact(churchill)
    messi.get_potential_old_contacts()
    # should return {'ideinstein': 1, 'iddescartes': 1}
    messi.add_first_contact(ronaldo)
    ronaldo.add_first_contact(descartes)
    messi.get_potential_old_contacts()
    # should return {'ideinstein': 1, 'iddescartes': 2}
    """

    def add_first_contact(self, new_friend: 'User') -> True:
        """ If the new_friend is not already a friend of the user, adds it to the
        first_contact of the user.
        """
        if new_friend not in self.first_contact:
            self.first_contact.append(new_friend)

        return new_friend in self.first_contact  # Returns true new_friend is successfully added
    
    def add_confirmed_old_contact(self, old_friend: 'User') -> True:
        """ If the old_friend is not already a friend of the user, adds it to the
        confirmed_old_contact of the user.
        """
        if old_friend not in self.confirmed_old_contact:
            self.confirmed_old_contact.append(old_friend)

        return old_friend in self.old_contact.append  # Returns true old_contact.append is successfully added
    
    def add_never_contact(self, no_please: 'User') -> True:
        """ If the no_please is not already a blacklisted by the user, adds it to the
        never_contact of the user.
        """
        if no_please not in self.never_contact:
            self.never_contact.append(no_please)

        return no_please in self.never_contact  # Returns true never_contact is successfully added

    def get_potential_old_contacts(self) -> list:
        """Finds the friends of the user's friends (the second contacts), and returns a list of
        those that are neither already a friend of the user, already a confirmed old friend
        of the user, or a person that the user declared as not known. The more first_contacts
        the user has with the second_contact, the greater weight the second_contact has.
        """
        potential_old_contacts = dict()

        for friend in self.first_contact:  # For each friend
            friends_friends = friend.first_contact
            for second_contact in friends_friends:  # For each of the new friend's friends
                if second_contact not in self.first_contact and \
                        second_contact not in self.confirmed_old_contact and \
                        second_contact not in self.never_contact  and \
                        second_contact.uid != self.uid:  # if this is a new guy
                    if second_contact.uid not in potential_old_contacts:  # if not already in potential
                        potential_old_contacts[second_contact.uid] = 1  # add the guy to potentials
                    else:
                        potential_old_contacts[second_contact.uid] += 1  # increase the weight of the guy

        near_users = get_near_users(self)
        for nearby in near_users:
            if nearby['uid'] not in potential_old_contacts and \
                nearby['uid'] not in self.first_contact and \
                nearby['uid'] not in self.confirmed_old_contact and \
                nearby['uid'] not in self.never_contact and \
                nearby['uid'] != self.uid:  # if not already in potential
                potential_old_contacts[nearby['uid']] = 1  # add the guy to potentials
            else:
                potential_old_contacts[nearby['uid']] += 1  # increase the weight of the guy 
        potential_old_contacts = dict( sorted(potential_old_contacts.items(), \
             key=operator.itemgetter(1),reverse=True))
        return [k for k in potential_old_contacts]


cred = credentials.Certificate("creds.json")
firebase_admin.initialize_app(cred)

db = firestore.client()


def __get(coll: str, doc: str, field: str):
    return db.collection(coll).document(doc).get().to_dict().get(field)


def login(email: str, password: str):
    if not db.collection("Users").document(email).get().exists:
        return None
    if __get("Users", email, "password") == password:
        return db.collection("Users").document(email).get().to_dict()
    return False


def register(user: User):
    if db.collection("Users").document(user.uid).get().exists:
        return False
    db.collection("Users").document(user.uid).set(asdict(user))
    return db.collection("Users").document(user.uid).get().to_dict()


def get_user(uid):
    if db.collection("Users").document(str(uid)).get().exists:
        return db.collection("Users").document(str(uid)).get().to_dict()
    return False


def update_user(uid, fname, lname, zip, high, middle):
    if db.collection("Users").document(uid).get().exists:
        db.collection("Users").document(uid).update({
            "first_name": fname,
            "last_name": lname,
            "zip_code": zip,
            "high_school": high,
            "middle_school": middle
        })
        return db.collection("Users").document(uid).get().to_dict()
    return False


def get_near_users(user: User):
    """
    if not get_user(user.uid):
        return False
    """
    zip = user.zip_code
    query = db.collection("Users") \
        .where("zip_code", "==", zip) \
        .limit(50) \
        .stream()
    return [x.to_dict() for x in query if x.id != user.uid]


def get_old_contacts(user: User):
    olds = user.get_potential_old_contacts()
    lst = [get_user(x) for x in olds]
    return lst



def get_chats(user: int):
    islarger = db.collection("Messages") \
        .where("LargerUID", "==", user) \
        .order_by("Timestamp", direction=firestore.Query.DESCENDING) \
        .limit(50) \
        .stream()
    allchats = set(x.to_dict()["SmallerUID"] for x in islarger)
    issmaller = db.collection("Messages") \
        .where("SmallerUID", "==", user) \
        .order_by("Timestamp", direction=firestore.Query.DESCENDING) \
        .limit(50) \
        .stream()
    allchats.update(x.to_dict()["LargerUID"] for x in issmaller)
    if len(allchats) < 1:
        return False
    return list(allchats)


def get_messages(u1: int, u2: int):
    if not get_user(u1) or not get_user(u2):
        return False
    larger = u1 if u1 > u2 else u2
    smaller = u2 if u1 > u2 else u1
    query = db.collection("Messages") \
        .where("LargerUID", "==", larger) \
        .where("SmallerUID", "==", smaller) \
        .order_by("Timestamp", direction=firestore.Query.DESCENDING) \
        .limit(50) \
        .stream()
    return [x.to_dict() for x in query]


def send_message(sender: int, receiver: int, message: str):
    if not get_user(sender) or not get_user(receiver):
        return False
    larger = sender if sender > receiver else receiver
    smaller = receiver if sender > receiver else sender
    lastid = list(db.collection("Messages").order_by("ID", direction=firestore.Query.DESCENDING).limit(1).stream())
    if len(lastid) < 1:
        lastid = -1
    else:
        lastid = int(lastid[0].id)
    db.collection("Messages").document(str(lastid + 1)).set({
        "ID": lastid + 1,
        "LargerUID": larger,
        "SmallerUID": smaller,
        "Timestamp": firestore.SERVER_TIMESTAMP,
        "Sender": sender,
        "Receiver": receiver,
        "Message": message
    })
    return db.collection("Messages").document(str(lastid + 1)).get().to_dict()
