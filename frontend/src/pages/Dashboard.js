import React, { useState, useEffect } from 'react';
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

  // Cargar historial de análisis al iniciar
  useEffect(() => {
    fetch('http://localhost:8000/historial')
      .then((res) => res.json())
      .then((data) => {
        const conteo = { positivo: 0, negativo: 0, neutro: 0 };
        data.forEach((item) => {
          const tipo = item.sentimiento.toLowerCase();
          if (conteo[tipo] !== undefined) conteo[tipo]++;
        });
        setSentimentData(conteo);
      })
      .catch((err) => console.error('Error al cargar historial:', err));
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      const data = await response.json();
      const resultado = data.sentiment;

      // Actualiza los datos del gráfico
      setSentimentData((prevData) => ({
        ...prevData,
        [resultado.toLowerCase()]: prevData[resultado.toLowerCase()] + 1,
      }));

      setResult(`Sentimiento detectado: ${resultado}`);
      setComment('');
    } catch (error) {
      console.error('Error al analizar:', error);
      setResult('Hubo un error al analizar el comentario.');
    }
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

        {/* Historial de comentarios analizados */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>Historial de Comentarios Analizados</h5>
              </div>
              <ul className="list-group list-group-flush">
                {Object.entries(sentimentData).map(([tipo, cantidad]) => (
                  <li key={tipo} className="list-group-item">
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}: {cantidad}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;