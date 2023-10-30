# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
from werkzeug.security import check_password_hash
import secrets
import requests
import sqlite3
import json

app = Flask(__name__)
connection = sqlite3.connect("data.db", check_same_thread=False)

cursor = connection.cursor()
cursor.execute("create table  IF NOT EXISTS users (email text, password text, username text, id text, followers text, following text, public_repos text, bio text, emailGitHub text, twitter_username text, company text, blog text)")

DATABASE = 'data.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def readData():
    '''
        Função para ler valores do banco de dados
    '''
    cursor = connection.cursor()
    cursor.execute("select * from users")
    dados = cursor.fetchall()
    return list(dados)

@app.route('/cadastros', methods=['POST'])
def cadastrar_usuario():
    data = request.get_json()
    email = data['email']
    password = data['password']
    username = data['username']

    response = requests.get('https://api.github.com/users/{}'.format(username))
    data = response.json()
    data = json.dumps(data)
    lista = json.loads(data)

    dados = [email, password, username, lista['id'], lista['followers'], lista['following'], lista['public_repos'], lista['bio'], lista['email'], lista['twitter_username'], lista['company'], lista['blog']]

    cursor = connection.cursor()
    cursor.execute("insert into users values (?,?,?,?,?,?,?,?,?,?,?,?)", dados)
    connection.commit()

    return jsonify({'message': 'Usuário cadastrado com sucesso!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    username = data['username']

    conn = get_db_connection()
    cursor = conn.execute('SELECT * FROM users WHERE email = ? and password = ?', (email, password))
    user = cursor.fetchone()
    
    if user['email'] == email and user['password'] == password:
        return jsonify({'message': 'Login bem-sucedido'}), 200
    else:
        return jsonify({'message': 'Credenciais inválidas'}), 401
	
# print(readData())

@app.route('/pesquisar', methods=['POST'])
def pesquisar():
    data = request.get_json()
    print(data)
    pesquisa = data['pesquisa']
    response = requests.get('https://api.github.com/users/{}/repos'.format(pesquisa))
    data = response.json()
    data = json.dumps(data)
    lista = json.loads(data)
    print(lista)

    return lista

if __name__ == '__main__':
	app.run(debug=True)
