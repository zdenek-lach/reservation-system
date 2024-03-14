import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from 'components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/appointment-page');
  };

  return (
    <div>
      <Container
        style={{
          backgroundSize: '100% 100%',
          height: '1000px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Row className='justify-content-md-center'>
          <Col md='auto'>
            <h1 className='mb-3 p-3'>Vstoupit do rezervačního systému</h1>
            <Button variant='primary' onClick={handleButtonClick}>
              Vstoupit
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
