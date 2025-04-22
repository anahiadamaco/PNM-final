import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../components/navbar';

function ResultsPage() {
  const history = useNavigate();

  const handleBack = () => {
    history.push('/dashboard');
  };

  return (
    <div>
      <MyNavbar />
      <Container>
        <h2>Resultados del Análisis</h2>
        {/* Aquí puedes mostrar los resultados de los análisis en forma de gráficos o texto */}
        <p>Texto analizado: "Este es un ejemplo de texto"</p>
        <p>Sentimiento detectado: Positivo</p>

        <Button variant="secondary" onClick={handleBack}>
          Volver al Dashboard
        </Button>
      </Container>
    </div>
  );
}

export default ResultsPage;