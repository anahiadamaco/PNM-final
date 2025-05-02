from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

# Simulamos una "base de datos" en memoria
usuarios = {}
historial = []

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
    
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    comment = data.get('comment', '')

    analysis = TextBlob(comment)
    polarity = analysis.sentiment.polarity

    if polarity > 0:
        sentiment = 'Positivo'
    elif polarity < 0:
        sentiment = 'Negativo'
    else:
        sentiment = 'Neutro'

    # Guardamos en el historial
    historial.append({
        'comentario': comment,
        'sentimiento': sentiment
    })

    return jsonify({'sentiment': sentiment})

@app.route('/historial', methods=['GET'])
def get_historial():
    return jsonify(historial)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)