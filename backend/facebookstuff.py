import json
import facebook

token = {}
graph = facebook.GraphAPI(token)
fields = {'id, name, email, taggable_friends'}
profile = graph.get_object('me', fields = fields)
print(json.dumps(profile, indent = 5))