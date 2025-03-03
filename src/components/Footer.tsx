import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
      <footer 
      className='mt-5'
      style={{
        background: '#dc3545',
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
            <h3>Ortopedická ordinace s.r.o.</h3>
            <ul className='list-unstyled'>
              <li>Odborná ortopedická ambulance</li>
              <li>Ulice</li>
              <li>PSČ Město - oblast</li>
              <li>IČO: XXXXXXXX</li>
              <li>telefon: +420 XXX XXX XXX</li>
              <li>e-mail: kontakt@ortoped.cz</li>
            </ul>
          </Col>
          <Col md={4}>
            <h3>Ambulance Město1</h3>
            <ul className="list-unstyled">
              <li>Ulice</li>
              <li>PSČ Město1</li>
            </ul>
          </Col>
          <Col md={4}>
            <h3>Ambulance Město2</h3>
            <ul className="list-unstyled">
              <li>Ulice</li>
              <li>PSČ Město2</li>
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