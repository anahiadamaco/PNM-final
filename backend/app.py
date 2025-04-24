from flask import Flask, request, jsonify
from flask_cors import CORS  # Importamos flask_cors para habilitar CORS

# Inicializamos la app de Flask
app = Flask(__name__)

# Habilitamos CORS en la aplicación para que pueda aceptar peticiones desde tu frontend
CORS(app)

# Ruta para comprobar si el servidor está funcionando correctamente
@app.route('/')
def home():
    return 'Backend funcionando correctamente'

# Ruta para manejar las solicitudes de análisis de sentimientos
@app.route('/api/analyze', methods=['POST'])
def analyze():
    # Intentamos obtener el texto enviado en el cuerpo de la solicitud
    data = request.get_json()
    texto = data.get('text', '')
    
    # Simulamos un análisis de sentimientos (esto se puede reemplazar con lógica real)
    if "bueno" in texto.lower():
        resultado = "Sentimiento positivo"
    elif "malo" in texto.lower():
        resultado = "Sentimiento negativo"
    else:
        resultado = "Sentimiento neutro"
    
    # Devolvemos el resultado en formato JSON
    return jsonify({"resultado": resultado})

# Iniciamos el servidor Flask en el puerto 5000
if __name__ == '__main__':
    app.run(debug=True, port=5000)  # El servidor se ejecutará en http://localhost:5000 por defecto