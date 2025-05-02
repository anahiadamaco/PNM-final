from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simulamos una "base de datos" en memoria
usuarios = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in usuarios:
        return jsonify({'success': False, 'message': 'Usuario ya existe'}), 400

    usuarios[username] = password
    return jsonify({'success': True, 'message': 'Usuario registrado con éxito'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if usuarios.get(username) == password:
        return jsonify({'success': True, 'token': 'fake-jwt-token'})
    else:
        return jsonify({'success': False, 'message': 'Credenciales inválidas'}), 401
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)