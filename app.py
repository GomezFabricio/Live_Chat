# Importa las clases necesarias desde Flask y Flask-SocketIO
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

# Crea una instancia de la aplicación Flask
app = Flask(__name__)

# Crea una instancia de SocketIO y asóciala a la aplicación Flask
socketio = SocketIO(app)

# Define la ruta principal ('/') para la página de inicio
@app.route('/')
def index():
    # Renderiza la plantilla HTML 'index.html' como página de inicio
    return render_template('index.html')

# Define la función 'handle_message' que se ejecutará cuando se reciba un evento 'message' a través de un socket
@socketio.on('message')
def handleMessage(data):
    # Emite el mensaje de vuelta a todos los clientes conectados (broadcast=True)
    emit('message', data, broadcast=True)

# Inicia la aplicación si este script se ejecuta directamente (no se importa como un módulo)
if __name__ == '__main__':
    # Ejecuta la aplicación Flask con SocketIO habilitado
    socketio.run(app, debug=True)
