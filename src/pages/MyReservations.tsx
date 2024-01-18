import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
  Table,
} from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const StyledForm = styled(Form)`
  margin-bottom: 20px;
`;

const MyReservations = () => {
  return (
    <StyledContainer>
      <Row>
        <Col>
          <h2>My Reservations</h2>
          <StyledForm inline>
            <Form.Group>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Ambulance
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Ambulance 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Ambulance 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            {/* Add your date picker component here */}
            <Form.Group>
              <Button variant="primary">Doctor</Button>
            </Form.Group>
          </StyledForm>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Číslo</th>
                <th>Jméno</th>
                <th>Příjmení</th>
                <th>Telefon</th>
                <th>E-mail</th>
                <th>Datum & Čas</th>
                <th>Doktor</th>
                <th>Ambulance</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace with dynamic data */}
              <tr>
                <td>#0001</td>
                <td>Petr</td>
                <td>Kovář</td>
                <td>+420 123 456 789</td>
                <td>email@example.com</td>
                <td>01/01/2024 10:00</td>
                <td>Doctor 1</td>
                <td>Ambulance 1</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default MyReservations;
