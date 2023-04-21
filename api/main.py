import os
from flask import Flask, request, jsonify, render_template
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

app = Flask(__name__, static_folder="build",
            static_url_path='/', template_folder='build')


def create_response(success, message=None, data=None):
    return jsonify({'success': success, 'message': message, 'data': data})


@app.route('/api', methods=['GET'])
def api():
    '''
    test api connection
    '''
    return create_response(True, "Success from api")


@app.errorhandler(404)
def index(path):
    print(f"404 errorhandler path: ", path)
    return render_template('index.html')


CUISINES = ['American', 'Asian', 'British', 'Caribbean', 'Central Europe', 'Chinese', 'Eastern Europe', 'French', 'Indian',
            'Italian', 'Japanese', 'Kosher', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'South American', 'South East Asian']


@app.route("/set-display-name", methods=['POST'])
def set_display_name():
    '''
    set user display name
    
    request {
        uid: string
        displayName: string
    }
    '''
    req = request.get_json()

    uid = req.get('uid')
    if not uid:
        return create_response(False, message="uid required in POST body")
    user_ref = db.collection(u'users').document(uid)

    user_ref.update({
        u'displayName': req.get('displayName')
    })

    user_doc = user_ref.get().to_dict()

    return create_response(True, data=user_doc)


@app.route("/set-photo-url", methods=['POST'])
def set_photo_url():
    '''
    set user photo url
    
    request {
        uid: string
        photoURL: string
    }
    '''
    req = request.get_json()

    uid = req.get('uid')
    if not uid:
        return create_response(False, message="uid required in POST body")
    user_ref = db.collection(u'users').document(uid)

    user_ref.update({
        u'photoURL': req.get('photoURL')
    })

    user_doc = user_ref.get().to_dict()

    return create_response(True, data=user_doc)


@app.route('/toggle-bookmark', methods=['POST'])
def toggle_bookmark():
    '''
    add user bookmark
    
    request {
        uid: string
        id: string
        add: boolean
            # True : add
            # False : remove
    }
    '''
    req = request.get_json()
    uid = req.get("uid")
    if not uid:
        return create_response(False, message="uid required in POST body")

    user_ref = db.collection(u'users').document(uid)
    user_doc = user_ref.get()
    user = user_doc.to_dict()

    new_bookmarks = user['bookmarks']

    if req.get('add'):
        new_bookmarks.append(req.get('id'))
    else:
        new_bookmarks = [
            item for item in new_bookmarks if item != req.get('id')]

    user_ref.update({
        u'bookmarks': new_bookmarks
    })

    user_doc = user_ref.get().to_dict()
    return create_response(True, data={'user': user_doc})


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
    if not is_returning_user:
        try:
            recipes_resp = get_random_recipes(True)
            hits = recipes_resp.get('hits')[:2]
            recipe_ids = [hit.get('recipe').get("uri") for hit in hits]
            testing_bookmarks = [
                uri[uri.index("recipe_")+7:] for uri in recipe_ids]
        except Exception as e:
            print(e)
    # !temp add 5 random bookmarks for testing

    if is_returning_user:
        user_ref.update({
            u'photoURL': req.get('photoURL'),
            u'lastSignInTime': req.get('lastSignInTime'),
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
            u'bookmarks': testing_bookmarks
        })

    # !temp

    user_doc = user_ref.get().to_dict()
    return create_response(True, "/login", data={'user': user_doc})


@app.route('/recipe/<id>', methods=['GET'])
def get_recipe(id: str, output=None):
    '''
        get recipe by id
    '''

    if id.startswith('custom'):
        recipe = db.collection(u'custom_recipes').document(id).get()
        if recipe.exists:
            return recipe
        return create_response(False, message="Invalid recipe id.")

    APP_ID = os.getenv("RECIPE_APP_ID")
    APP_KEY = os.getenv("RECIPE_APP_KEY")
    request_url = f'https://api.edamam.com/api/recipes/v2/{id}?type=public&app_id={APP_ID}&app_key={APP_KEY}'
    resp = requests.get(request_url).json()

    if (output):
        return resp

    recipe = None

    try:
        recipe = resp.get("recipe")
        if not recipe:
            raise Exception
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
            recipe = resp.get("recipe")
            if not recipe:
                continue
            recipes.append(recipe)
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


@app.route('/recipe-manager/create', methods=['POST'])
def recipe_manager_create():
    '''
    create a custom recipe for the current user
    
    request {
        uid: string,
        (RecipeRow)
        label,
        image,
        calories,
        cuisineType,
        dishType,
        // TODO recipe props => Recipe page (in progress)
        directions: string[],
        ingredients: string[]
        [...]
    }
    '''
    req = request.get_json()

    recipe_ref = db.collection(u'custom_recipes').document()
    recipe_ref.set({
        'uid': req.get('uid'),
        'uri': f'custom_{recipe_ref.id}',
        'label': req.get('label'),
        'image': req.get('image'),
        'calories': req.get('calories'),
        'cuisineType': req.get('cuisineType'),
        'dishType': req.get('dishType'),
        'directions': req.get('directions'),
        'ingredients': req.get('ingredients')
    })

    recipe = recipe_ref.get().to_dict()

    return create_response(True, data=recipe)


@app.route('/recipe-manager/delete', methods=['POST'])
def recipe_manager_delete():
    '''
        delete a given custom recipe
        
        request {
            uid: string, (owner: safety in deletion)
            recipe_id: string
        }
    '''
    req = request.get_json()

    recipe_id = req.get('recipe_id')
    recipe_ref = db.collection(u'custom_recipes').document(recipe_id)

    recipe_doc = recipe_ref.get()
    if not recipe_doc.exists:
        return create_response(False, message="Invalid recipe id.")

    recipe = recipe_doc.to_dict()
    if recipe.get('uid') != req.get('uid'):
        return create_response(False, message="Invalid user id.")

    recipe_ref.delete()
    return create_response(True, message=f"Deleted recipe: {recipe_id}")


@app.route('/recipe-manager/list/<uid>', methods=['GET'])
def recipe_manager_list(uid):
    '''
    lists user's custom recipes
    '''
    user_recipes_ref = db.collection(
        u'custom_recipes').where(u'uid', u'==', uid)
    user_recipes_docs = user_recipes_ref.stream()

    user_recipes = [recipe.to_dict() for recipe in user_recipes_docs]

    return create_response(True, data=user_recipes)


if __name__ == '__main__':
    app.run(debug=True)
