from flask import Flask, request, jsonify
from os.path import join, dirname
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import credentials, firestore

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


def get_random_recipe():
    '''
    https://api.edamam.com/api/recipes/v2
    app id: f0bb7eba
    app key: 5cdad02e865b28f2a4f39f100878b070	
    '''

    return None


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
            u'bookmarks': []
        })

    # !temp

    user_doc = user_ref.get().to_dict()
    return create_response(True, "/login", data={'user': user_doc})


@app.route('/recipe/<id>', methods=['GET'])
def get_recipe(id: int):
    '''
        get recipe by id
    '''
    print(f"fetching recipe id: {id}")
    return create_response(True)


if __name__ == '__main__':
    app.run(debug=True)
