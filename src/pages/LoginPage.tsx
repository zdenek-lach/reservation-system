import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={() => navigate('/management')}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
