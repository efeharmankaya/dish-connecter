import os
from flask import Flask, request, jsonify
from os.path import join, dirname
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore
import requests

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

cred = credentials.Certificate("serviceAccount.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)


def create_response(success, message=None, data=None):
    return jsonify({'success': success, 'message': message, 'data': data})


@app.route('/', methods=['GET'])
def index():
    '''
    test api connection
    '''
    return create_response(True, "Success from api")


CUISINES = ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian',
            'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian']


@app.route('/TEST-recipe', methods=['GET'])
def get_random_recipes(output=None):
    from random import choice
    '''
    https://api.edamam.com/api/recipes/v2
    '''
    APP_ID = os.getenv("RECIPE_APP_ID")
    APP_KEY = os.getenv("RECIPE_APP_KEY")
    request_url = f'https://api.edamam.com/api/recipes/v2?type=public&app_id={APP_ID}&app_key={APP_KEY}&random=true&cuisineType={choice(CUISINES)}'

    req = requests.get(request_url)
    resp = req.json()

    if output:
        return resp

    return create_response(True, data=resp)


@app.route('/login', methods=['POST'])
def login():
    '''
    login user
        - update user db
        - return populated user document
    '''

    req = request.get_json()
    uid = req.get("uid")
    user_ref = db.collection(u'users').document(uid)
    user_doc = user_ref.get()
    is_returning_user = user_doc.exists

    # !temp add 5 random bookmarks for testing
    testing_bookmarks = []
    if is_returning_user:
        try:
            recipes_resp = get_random_recipes(True)
            hits = recipes_resp.get('hits')[:5]
            recipe_ids = [hit.get('recipe').get("uri") for hit in hits]
            testing_bookmarks = [
                uri[uri.index("recipe_"):] for uri in recipe_ids]
        except Exception as e:
            print(e)
    # !temp add 5 random bookmarks for testing

    if is_returning_user:
        user_ref.update({
            u'photoURL': req.get('photoURL'),
            u'lastSignInTime': req.get('lastSignInTime'),
            u'bookmarks': testing_bookmarks

        })
    else:  # new user document
        user_ref.set({
            u'uid': req.get('uid'),
            u'displayName': req.get('displayName'),
            u'email': req.get('email'),
            u'photoURL': req.get('photoURL'),
            u'creationTime': req.get('creationTime'),
            u'lastSignInTime': req.get('lastSignInTime'),
            u'recipes': [],
            u'bookmarks': []
        })

    # !temp

    user_doc = user_ref.get().to_dict()
    return create_response(True, "/login", data={'user': user_doc})


@app.route('/recipe/<id>', methods=['GET'])
def get_recipe(id: int, output=None):
    '''
        get recipe by id
    '''
    APP_ID = os.getenv("RECIPE_APP_ID")
    APP_KEY = os.getenv("RECIPE_APP_KEY")
    request_url = f'https://api.edamam.com/api/recipes/v2/{id}?type=public&app_id={APP_ID}&app_key={APP_KEY}'
    resp = requests.get(request_url).json()

    if (output):
        return resp

    recipe = None

    try:
        recipe = resp.get("recipe")
    except Exception:
        return create_response(False, data=resp)

    return create_response(True, data=recipe)


@app.route('/get-recipes', methods=['POST'])
def get_recipes():
    '''
        get multiple recipes
        
        request: {
            ids: string[]
        }
    '''
    req = request.get_json()
    ids = req.get("ids")

    recipes = []
    for id in ids:
        resp = get_recipe(id, True)
        try:
            recipes.append(resp.get("recipe"))
        except Exception:
            continue

    return create_response(True, data=recipes)


@app.route("/search", methods=['POST'])
@app.route("/search/<query>", methods=['GET'])
def search(query=None):
    # TODO paginate needed? (if not -> max 20 results)
    '''
    query recipe search for recipe results
    
    request: {
        query: string
    }
    '''
    if not query:
        req = request.get_json()
        query = req.get("query")

    APP_ID = os.getenv("RECIPE_APP_ID")
    APP_KEY = os.getenv("RECIPE_APP_KEY")
    request_url = f'https://api.edamam.com/api/recipes/v2?type=public&app_id={APP_ID}&app_key={APP_KEY}&q={query}'

    resp = requests.get(request_url).json()
    recipes = []
    try:
        hits = resp.get("hits")
        recipes = [hit.get('recipe') for hit in hits]
    except Exception:
        return create_response(False, data=resp)

    return create_response(True, data=recipes)

if __name__ == '__main__':
    app.run(debug=True)
