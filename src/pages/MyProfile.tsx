import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const StyledForm = styled(Form)`
  margin-bottom: 20px;
`;

const MyProfile = () => {
  return (
    <StyledContainer>
      <Row>
        <Col>
          <h2>Personal Information</h2>
          <StyledForm>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </StyledForm>
        </Col>
        <Col>
          <h2>Weekly Shift Settings</h2>
          {/* You can create a separate component for the shift settings */}
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default MyProfile;
