import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa 'react-dom/client' para usar 'createRoot'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Crea el root
root.render(<App />); // Usa 'render' desde 'createRoot'