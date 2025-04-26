import React from 'react';
import Navbar from '../components/Navbar';  // Importa el Navbar

const historyData = [
  { id: 1, text: 'Análisis 1', sentiment: 'Positivo 😀' },
  { id: 2, text: 'Análisis 2', sentiment: 'Negativo 😞' },
  { id: 3, text: 'Análisis 3', sentiment: 'Neutral 😐' },
];

function History() {
  return (
    <div>
      <Navbar />  {/* Aquí estamos usando el Navbar */}

      <h1 className="mt-5">Historial de Análisis</h1>
      
      <div className="mt-4">
        <h2>Resultados anteriores</h2>
        <div className="list-group">
          {historyData.map((item) => (
            <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{item.text}</span>
              <span className={`badge ${item.sentiment === 'Positivo 😀' ? 'bg-success' : item.sentiment === 'Negativo 😞' ? 'bg-danger' : 'bg-secondary'}`}>
                {item.sentiment}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;