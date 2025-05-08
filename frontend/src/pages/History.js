import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';  // Importa el Navbar

function History() {
  const [historyData, setHistoryData] = useState([]);  // Guardamos los datos del historial

  // Usamos useEffect para cargar el historial de análisis cuando la página se carga
  useEffect(() => {
    const userId = localStorage.getItem('user_id'); // Obtener el ID del usuario de localStorage

    // Hacer una solicitud GET al backend para obtener el historial
    fetch(`${process.env.REACT_APP_API_URL}/history/${userId}`)
      .then(res => res.json())  // Convertir la respuesta a formato JSON
      .then(data => {
        console.log("Datos del historial:", data);  // Ver los datos recibidos en la consola para verificar
        setHistoryData(data);  // Guardamos los datos en el estado
      })
      .catch(err => console.error("Error al cargar historial:", err));  // Manejar cualquier error
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
              <span>{item.text}</span>  {/* Mostrar el comentario */}
              <span
                className={`badge ${item.sentiment === 'Positivo' ? 'bg-success' : item.sentiment === 'Negativo' ? 'bg-danger' : 'bg-secondary'}`}
              >
                {/* Mostrar el sentimiento con el ícono correspondiente */}
                {item.sentiment === 'Positivo' ? 'Positivo 😀' : item.sentiment === 'Negativo' ? 'Negativo 😞' : 'Neutral 😐'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;