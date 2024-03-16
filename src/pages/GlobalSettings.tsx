import React, { Fragment } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import FooterManagement from 'components/FooterManagement';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const Section = styled.div`
  width: 45%;
  border: 1px solid #ccc;
  padding: 10px;
`;

const SectionTitle = styled.h4`
  font-weight: bold;
  margin-bottom: 10px;
`;

const SupportText = styled.p`
  font-size: 12px;
  color: #999;
  text-align: right;
  margin-right: 20px;
`;

interface Props {
  // Define your props here if needed
}

const GlobalSettings: React.FC<Props> = () => {
  return (
    <Fragment>
      <Container>
        <Section>
          <SectionTitle>Obecné</SectionTitle>
          <Form>
            <Form.Group as={Row} controlId="colorPalette">
              <Form.Label column sm="4">
                Barvová paleta:
              </Form.Label>
              <Col sm="8">
                <Form.Control as="select">
                  <option>Modrá</option>
                  <option>Červená</option>
                  <option>Zelená</option>
                  <option>Žlutá</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="ambulanceCount">
              <Form.Label column sm="4">
                Počet ambulancí:
              </Form.Label>
              <Col sm="8">
                <Form.Control type="number" min="1" max="10" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="addWeekends">
              <Form.Label column sm="4">
                Přidat víkendy do kalendáře:
              </Form.Label>
              <Col sm="8">
                <Form.Check type="checkbox" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="editReservations">
              <Form.Label column sm="4">
                Zaměstnanci můžou upravovat vlastní rezervace:
              </Form.Label>
              <Col sm="8">
                <Form.Check type="checkbox" />
              </Col>
            </Form.Group>
          </Form>
        </Section>

        <Section>
          <SectionTitle>Rezervace</SectionTitle>
          <Form>
            <Form.Group as={Row} controlId="reservationCount">
              <Form.Label column sm="4">
                Počet rezervačí po hodinovém úseku:
              </Form.Label>
              <Col sm="8">
                <Form.Control type="number" min="1" max="10" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="extraReservations">
              <Form.Label column sm="4">
                Počet extra rezervací po hodinovém úseku od admina:
              </Form.Label>
              <Col sm="8">
                <Form.Control type="number" min="0" max="10" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="maxReservations">
              <Form.Label column sm="4">
                Maximální počet rezervačních míst:
              </Form.Label>
              <Col sm="8">
                <Form.Control type="number" min="1" max="100" />
              </Col>
            </Form.Group>
          </Form>
        </Section>

        <Button variant="primary">Uložit změny</Button>
        <SupportText>Pomozte nám vývojářům a podpořte nás zde.</SupportText>
      </Container>
      <FooterManagement></FooterManagement>
    </Fragment>
  );
};

export default GlobalSettings;
