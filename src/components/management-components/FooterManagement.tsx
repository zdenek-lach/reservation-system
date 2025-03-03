import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => {

  return (
      <footer 
      className='mt-5'
      style={{
        background: '#dc3545',
        display: 'block',
        boxSizing: 'inherit',
        bottom: '0',
        width: '100%',
        fontWeight: '400',
        color: 'white',
        marginLeft: '0',
        marginRight: '0',
        position: 'relative',
      }}
      >
      <Container
      className='container-fluid'
      >
        <hr />
        <Row>
          <Col>
          <p className='text-center'>Podpořte mě tím, že mi koupíte kafe :)
            <Button
              variant='success'
              className='ms-1 me-1'
              size='sm'
              // href='https://www.buymeacoffee.com/zdeneklach' unfortunately, due to legal reasons, I am not allowed to use this feature yet
            >
              Koupit!
            </Button>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center">© {new Date().getFullYear()} FE code: Zdeněk Lach, BE code: Marek Lohn, ProductManagement: Jan Šichman. Všechna práva vyhrazena.</p>
          </Col>
        </Row>
      </Container>
      </footer>
  );
};

export default Footer;