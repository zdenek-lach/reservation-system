import WeekGrid from 'components/WeekGrid';
import WeekPicker from 'components/WeekPicker';
import { useState } from 'react';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const StyledForm = styled(Form)`
  margin-bottom: 20px;
`;

const MyShifts = () => {
  const [currentWeek, setCurrentWeek] = useState(() => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust to Monday
    date.setDate(diff);
    date.setHours(0, 0, 0, 0); // set time to 00:00:00.000
    return date;
  });
  return (
    <StyledContainer>
      <Row>
        <Col>
          <h2>My Shifts</h2>
          <StyledForm inline>
            <Form.Group>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Preset
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Preset 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Preset 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group>
              <Button variant="primary">Load Preset</Button>
            </Form.Group>
            <Form.Group>
              <Button variant="primary">Save Changes</Button>
            </Form.Group>
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
            <Col>
              <WeekPicker
                currentWeek={currentWeek}
                setCurrentWeek={setCurrentWeek}
              />
            </Col>
          </StyledForm>
        </Col>
      </Row>
      <Row>
        <Col>
          <WeekGrid startOfWeek={currentWeek} />
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default MyShifts;
