import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h3>Artromedi s.r.o.</h3>
            <p>Odborná ortopedická ambulance</p>
            <p>Žižkova 2379/54a</p>
            <p>733 01 Karviná - Mizerov</p>
            <p>IČO: 06694560</p>
            <p>telefon: +420 732 896 726</p>
            <p>e-mail: kontakt@artromedi.cz</p>
          </Col>
          <Col md={4}>
            <h3>Ambulance Karviná</h3>
            <ul className="list-unstyled">
              <li>sadfasdfasdfasdfsd</li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </Col>
          <Col md={4}>
            <h3>Ambulance Český Těšín</h3>
            <ul className="list-unstyled">
              <li>sadfasdfasdfasdfsd</li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </Col>
          
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="text-center">© {new Date().getFullYear()} Jackie, Mark and Pepega. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;