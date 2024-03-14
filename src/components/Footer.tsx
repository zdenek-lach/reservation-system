import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
      <footer 
      className='mt-5'
      style={{
        background: '#d11a1a',
        paddingTop: '40px',
        display: 'block',
        boxSizing: 'inherit',
        bottom: '0',
        width: '100%',
        fontWeight: '400',
        color: 'white',
        marginLeft: '0',
        marginRight: '0',
      }}
      >
      <Container
      className='container-fluid'
      >
        <Row>
          <Col md={4}>
            <h3>Artromedi s.r.o.</h3>
            <ul className='list-unstyled'>
              <li>Odborná ortopedická ambulance</li>
              <li>Žižkova 2379/54a</li>
              <li>733 01 Karviná - Mizerov</li>
              <li>IČO: 06694560</li>
              <li>telefon: +420 732 896 726</li>
              <li>e-mail: kontakt@artromedi.cz</li>
            </ul>
          </Col>
          <Col md={4}>
            <h3>Ambulance Karviná</h3>
            <ul className="list-unstyled">
              <li>Žižkova 2379/54a</li>
              <li>733 01 Karviná - Mizerov</li>
            </ul>
          </Col>
          <Col md={4}>
            <h3>Ambulance Český Těšín</h3>
            <ul className="list-unstyled">
              <li>Jablunkovská 1916/76a</li>
              <li>737 01 Český Těšín</li>
            </ul>
          </Col>
          
        </Row>
        <hr />
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