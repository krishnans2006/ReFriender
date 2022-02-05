from dataclasses import dataclass, field
from typing import Optional

@dataclass
class User:
    uid: str
    first_name: str
    last_name: str
    country: str
    city: str
    high_school: Optional[str] = ''
    middle_school: Optional[str] = ''
    elementary_school: Optional[str] = ''
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

    def get_potential_old_contacts(self) -> dict:
        """Finds the friends of the user's friends (the second contacts), and returns a list of
        those that are neither already a friend of the user, already a confirmed old friend
        of the user, or a person that the user declared as not known. The more first_contacts
        the user has with the second_contact, the greater weight the second_contact has.
        """
        potential_old_contacts = dict()
        for friend in self.first_contact:  # FOr each friend
            friends_friends = friend.first_contact
            for second_contact in friends_friends:  # For each of the new friend's friends
                if second_contact not in self.first_contact and \
                        second_contact not in self.confirmed_old_contact and \
                        second_contact not in self.never_contact:  # if this is a new guy
                    if second_contact.uid not in potential_old_contacts:  # if not already in potential
                        potential_old_contacts[second_contact.uid] = 1  # add the guy to potentials
                    else:
                        potential_old_contacts[second_contact.uid] += 1  # increase the weight of the guy
        return potential_old_contacts
