import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';  // Importa el Navbar

function History() {
  const [historyData, setHistoryData] = useState([]);

  // Cargar historial de análisis al iniciar
  useEffect(() => {
    fetch('http://localhost:8000/historial')
      .then((res) => res.json())
      .then((data) => {
        setHistoryData(data);
      })
      .catch((err) => console.error('Error al cargar historial:', err));
  }, []);

  return (
    <div>
      <Navbar />  {/* Aquí estamos usando el Navbar */}

      <h1 className="mt-5">Historial de Análisis</h1>
      
      <div className="mt-4">
        <h2>Resultados anteriores</h2>
        <div className="list-group">
          {historyData.map((item, index) => (
            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{item.comentario}</span>
              <span
                className={`badge ${item.sentimiento === 'Positivo' ? 'bg-success' : item.sentimiento === 'Negativo' ? 'bg-danger' : 'bg-secondary'}`}
              >
                {item.sentimiento === 'Positivo' ? 'Positivo 😀' : item.sentimiento === 'Negativo' ? 'Negativo 😞' : 'Neutral 😐'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;