import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter'; // o donde tengas tu componente principal
import 'bootstrap/dist/css/bootstrap.min.css'; // Para el CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Para el JS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);