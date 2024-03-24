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
          <p className='text-center'>Podpořte nás vývojáře tím, že nám koupíte kafe :)
            <Button
              variant='success'
              className='ms-1 me-1'
              size='sm'
              href='https://www.buymeacoffee.com/jansichman'
            >
              Koupit!
            </Button>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center">© {new Date().getFullYear()} Jan Šichman, Marek Lohn, Zdeněk Lach. Všechna práva vyhrazena.</p>
          </Col>
        </Row>
      </Container>
      </footer>
  );
};

export default Footer;