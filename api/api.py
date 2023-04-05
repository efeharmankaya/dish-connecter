from flask import Flask, request, jsonify
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)
app = Flask(__name__)


def create_response(success, message=None, data=None):
    return jsonify({'success': success, 'message': message, 'data': data})


@app.route('/')
def index():
    return create_response(True, "Success from api")
