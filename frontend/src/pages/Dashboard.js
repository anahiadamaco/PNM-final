import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';  // Importa el Navbar

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

      <h1>Dashboard</h1>

      <div>
        <h2>Gráfico de Sentimientos</h2>
        <ResponsiveContainer width="100%" height={300}>
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

      <div style={{ marginTop: '30px' }}>
        <h2>Analizar Comentario</h2>
        <form onSubmit={handleAnalyze}>
          <textarea
            rows="4"
            cols="50"
            placeholder="Escribe un comentario para analizar..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
          <br />
          <button type="submit">Analizar</button>
        </form>
        {result && (
          <div className="alert alert-info mt-3" role="alert">
            <strong>{result}</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;