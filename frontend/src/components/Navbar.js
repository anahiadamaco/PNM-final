import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();  // Usamos useNavigate para redirigir

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Eliminar el user_id del localStorage
    localStorage.removeItem('user_id');
    
    // Redirigir al login (ajusta la ruta según tu estructura)
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Dashboard
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="btn btn-outline-light me-3" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-light" to="/history">
                Historial
              </Link>
            </li>
            {/* Botón para cerrar sesión */}
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;