import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import { useState } from 'react';
import { Alert, Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import config from '../../config/config.json';
import { login } from './../security/AuthService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, username, setUsername } = useAppContext();
  const [loginUserName, setLoginUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLoginError, setShowLoginError] = useState(false);

  const handleLoginButton = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const loginData = {
      username: loginUserName,
      password: password,
    };

    axios
      .post(config.api.authApi.getToken, loginData)
      .then((response) => {
        if (response.status === 200) {
          console.log(`Successfully logged in`);
          console.log(response.status);
          setIsLoggedIn(true);
          login(loginUserName, password);
          setUsername(loginUserName);
          navigate('/management');
        } else if (response.status === 400) {
          setLoginError(response.data.message);
          setShowLoginError(true);
        }
      })
      .catch((error) => {
        console.error(`Error while logging in:`, error);

        if (error.response) {
          const statusCode = error.response.status;

          if (statusCode === 400) {
            setLoginError('Chybí uživatelské jméno nebo heslo');
          } else if (statusCode === 401) {
            setLoginError('Neplatné přihlašovací údaje.');
          } else {
            setLoginError('Nastala chyba při přihlášení.');
          }
        } else {
          setLoginError('Nastala chyba při komunikaci se serverem.');
        }

        setShowLoginError(true);
      });
  };

  return (
    <Container className='mt-5 ps-'>
      <Row>
        <Col></Col>
        <Col>
          <Row>
            <h2 className='ps-0'>Přihlášení</h2>
          </Row>
          <Form id='loginForm' onSubmit={handleLoginButton}>
            {showLoginError && <Alert variant='danger'>{loginError}</Alert>}
            <Form.Group controlId='formUsername' className = 'mt-4'>
              <Row>
                <Form.Control
                  type='text'
                  placeholder='Uživatelské jméno'
                  value={loginUserName}
                  onChange={(e) => setLoginUserName(e.target.value)}
                />
              </Row>
            </Form.Group>
            <Form.Group controlId='formPassword' className = 'mt-4'>
              <Row>
                <Col
                  className='ps-0 pe-0 col-9'
                >
                  <Form.Control
                    type='password'
                    placeholder='Heslo'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
                <Col
                  className='ps-0 pe-0'
                >
                  <div className='d-grid'>
                    <Button
                      className=''
                      variant='danger'
                      type='button'
                    >
                      Zobrazit
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form.Group>
            <Row>
              <Button
                variant='danger'
                type='submit'
                onClick={handleLoginButton}
                className='mt-4 col-3'
              >
                Přihlásit se
              </Button>
            </Row>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
