import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [comment, setComment] = useState('');
  const [sentimentData, setSentimentData] = useState({
    positivo: 0,
    negativo: 0,
    neutro: 0,
  });
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]); // Agregado para mostrar historial real

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    fetch(`http://localhost:8000/history/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo obtener historial');
        return res.json();
      })
      .then((data) => {
        setHistory(data);

        // Contar sentimientos para el gráfico
        const contadores = { positivo: 0, negativo: 0, neutro: 0 };
        data.forEach((c) => {
          contadores[c.sentiment.toLowerCase()] += 1;
        });
        setSentimentData(contadores);
      })
      .catch((err) => {
        console.error('Error al cargar historial:', err);
      });
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setResult('Error: usuario no identificado');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, user_id: userId }),
      });

      const data = await response.json();
      const resultado = data.sentiment;

      // Actualizar gráfico
      setSentimentData((prev) => ({
        ...prev,
        [resultado.toLowerCase()]: prev[resultado.toLowerCase()] + 1,
      }));

      // Agregar al historial local
      setHistory((prev) => [...prev, { text: comment, sentiment: resultado }]);

      setResult(`Sentimiento detectado: ${resultado}`);
      setComment('');
    } catch (error) {
      console.error('Error al analizar:', error);
      setResult('Hubo un error al analizar el comentario.');
    }
  };

  const data = [
    { name: 'Positivos', cantidad: sentimentData.positivo },
    { name: 'Negativos', cantidad: sentimentData.negativo },
    { name: 'Neutros', cantidad: sentimentData.neutro },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          {/* Gráfico */}
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-header"><h2>Gráfico de Sentimientos</h2></div>
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

          {/* Formulario */}
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-header"><h2>Analizar Comentario</h2></div>
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
                  <div className="alert alert-info mt-3">
                    <strong>{result}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Historial */}
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>Historial de Comentarios Analizados</h5>
              </div>
              <ul className="list-group list-group-flush">
                {history.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    <span>{item.text}</span>
                    <span
                      className={`badge ${
                        item.sentiment === 'Positivo'
                          ? 'bg-success'
                          : item.sentiment === 'Negativo'
                          ? 'bg-danger'
                          : 'bg-secondary'
                      }`}
                    >
                      {item.sentiment}
                    </span>
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