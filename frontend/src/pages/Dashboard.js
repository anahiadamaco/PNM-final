import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar'; // Importamos el Navbar

const Dashboard = () => {
  const [comment, setComment] = useState('');
  const [sentimentData, setSentimentData] = useState({
    positivo: 0,
    negativo: 0,
    neutro: 0,
  });
  const [result, setResult] = useState('');

  const handleAnalyze = (e) => {
    e.preventDefault();

    // Simulación de análisis aleatorio
    const resultados = ['Positivo', 'Neutro', 'Negativo'];
    const resultadoAleatorio = resultados[Math.floor(Math.random() * resultados.length)];

    // Actualiza la cantidad de comentarios según el sentimiento detectado
    setSentimentData((prevData) => ({
      ...prevData,
      [resultadoAleatorio.toLowerCase()]: prevData[resultadoAleatorio.toLowerCase()] + 1,
    }));

    // Guarda el resultado en el estado
    setResult(`Sentimiento detectado: ${resultadoAleatorio}`);
    setComment('');
  };

  // Datos para el gráfico basado en los comentarios
  const data = [
    { name: 'Positivos', cantidad: sentimentData.positivo },
    { name: 'Negativos', cantidad: sentimentData.negativo },
    { name: 'Neutros', cantidad: sentimentData.neutro },
  ];

  return (
    <div>
      <Navbar />  {/* Aquí estamos usando el Navbar */}

      <div className="container mt-5">
        <div className="row">
          {/* Columna para el gráfico */}
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header">
                <h2>Gráfico de Sentimientos</h2>
              </div>
              <div className="card-body" style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cantidad" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Columna para el formulario y resultado */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-header">
                <h2>Analizar Comentario</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleAnalyze}>
                  <div className="mb-3">
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Escribe un comentario para analizar..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Analizar</button>
                </form>
                {result && (
                  <div className="alert alert-info mt-3" role="alert">
                    <strong>{result}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;