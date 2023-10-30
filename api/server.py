# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
import secrets
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


# Simulação de um banco de dados de usuários
users = [
    ['usuario1', 'senha1', 'i'],
    ['usuario2', 'senha2', 'j']
]

# Dicionário para armazenar os tokens
tokens = {}


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    name = data['user']

    if username in users and users[username] == password:
        token = secrets.token_hex(16)
        tokens[token] = username
        return jsonify({'token': token}), 200
    else:
        return jsonify({'error': 'Credenciais inválidas'}), 401
# Route for seeing a data
# @app.route('/signup')
# def signup():
	

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)
