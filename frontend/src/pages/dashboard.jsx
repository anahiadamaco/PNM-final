import React, { useState } from 'react';
import { Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../components/navbar';

function Dashboard() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setAnalysisResult(data.resultado); // <- Esto también hay que corregir
    } catch (error) {
      console.error('Error al analizar:', error);
      setAnalysisResult('Error al conectar con el servidor.');
    }
  };

  const handleGoToResults = () => {
    navigate('/results');
  };

  return (
    <div>
      <MyNavbar />
      <Container className="mt-4">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center mb-3">Panel de Análisis de Sentimientos</h2>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Analizar Texto</Card.Title>
                <Form>
                  <Form.Group controlId="textInput">
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder="Introduce el texto a analizar"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleAnalyze} className="mt-3">
                    Analizar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm bg-light">
              <Card.Body>
                <Card.Title>Resultado</Card.Title>
                {analysisResult ? (
                  <p className="fs-5">{analysisResult}</p>
                ) : (
                  <p className="text-muted">Aún no se ha realizado ningún análisis.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Historial de Análisis</Card.Title>
                <p className="text-muted">(Aquí se mostrará el historial de análisis próximamente)</p>
                <Button variant="outline-secondary" onClick={handleGoToResults}>
                  Ver Resultados
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;