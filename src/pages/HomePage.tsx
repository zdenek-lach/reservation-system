import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ClinicPicture from 'assets/clinic-picture.webp';

const HomePage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/appointment-page');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${ClinicPicture})`,
        backgroundSize: '100% 100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1 className="mb-3">Vstoupit do rezervačního systému</h1>
            <p>Choose your side: </p>
            <Button variant="primary" onClick={handleButtonClick}>
              Vstoupit
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
