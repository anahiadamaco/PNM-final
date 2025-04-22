import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../components/navbar';

function Dashboard() {
  const history = useNavigate();
  const [text, setText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = () => {
    // Aquí llamarías a la API de análisis de sentimientos
    setAnalysisResult('Sentimiento positivo'); // Simulación de resultado
  };

  return (
    <div>
      <MyNavbar />
      <Container>
        <h2>Panel de Análisis de Sentimientos</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Introduce el texto a analizar"
          rows="4"
          className="form-control"
        />
        <Button variant="primary" onClick={handleAnalyze} className="mt-3">
          Analizar
        </Button>

        {analysisResult && (
          <div className="mt-3">
            <h4>Resultado del análisis:</h4>
            <p>{analysisResult}</p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Dashboard;