import React from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorPageProps {
  errorMessage?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
  return (
    <Container
      style={{
        background: 'linear-gradient(to right, black, red)',
        minHeight: '100vh',
        width: '100%',
        margin: 'auto',
        padding: 'auto',
      }}
      className="d-flex justify-content-center align-items-center fluid"
    >
      <Row className="p-5 bg-white shadow rounded">
        <Col xs={12} className="text-center">
          <FaExclamationTriangle size="64px" color="red" />
        </Col>
        <Col xs={12} className="text-center">
          <h1 className="font-weight-bold text-dark">
            Oops! Něco se pokazilo.
          </h1>
        </Col>
        <Col xs={12} className="text-center">
          <p className="text-muted">
            Omlouváme se, zdá se, že se někde stala chyba.
          </p>
        </Col>
        {errorMessage && (
          <Col xs={12} className="text-center">
            <Alert variant="danger">{errorMessage}</Alert>
          </Col>
        )}
        <Col xs={12} className="text-center">
          <p className="text-muted">
            Prosím zkuste to znovu později něbo kontaktuje podporu.
          </p>
        </Col>
        <Col xs={12} className="text-center">
          <Button variant="danger" onClick={() => window.location.reload()}>
            Obnovit stránku
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
