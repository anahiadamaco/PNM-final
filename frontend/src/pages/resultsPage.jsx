import React from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../components/navbar';

function ResultsPage() {
  const history = useNavigate();

  const handleBack = () => {
    history('/dashboard');
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <MyNavbar />
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm rounded-4">
              <Card.Body>
                <h3 className="mb-4 text-center">Resultados del Análisis</h3>

                <div className="mb-4">
                  <h6 className="text-muted">Texto analizado:</h6>
                  <p className="fs-5">"Este es un ejemplo de texto"</p>

                  <h6 className="text-muted">Sentimiento detectado:</h6>
                  <p className="fs-5 fw-semibold text-success">Positivo</p>
                </div>

                <div className="d-grid">
                  <Button variant="outline-dark" onClick={handleBack}>
                    Volver al Dashboard
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ResultsPage;