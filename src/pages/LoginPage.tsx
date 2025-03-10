import axios from 'axios';
import FooterManagement from 'components/management-components/FooterManagement';
import { useAppContext } from 'context/AppContext';
import { Fragment, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import config from '../../config/config.json';
import { login } from './../security/AuthService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  const { setTimerSet } = useAppContext();
  const [loginUserName, setLoginUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showLoginError, setShowLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
          login(loginUserName, password, setIsLoggedIn);
          setTimerSet(true);
          setIsLoggedIn(true);
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
    <Fragment>
      <Container className='mt-5 ps-'>
        <Row>
          <Col></Col>
          <Col>
            <Row>
              <h2 className='ps-0'>Přihlášení</h2>
            </Row>
            <Form id='loginForm' onSubmit={handleLoginButton}>
              {showLoginError && <Alert variant='danger'>{loginError}</Alert>}
              <Form.Group controlId='formUsername' className='mt-4'>
                <Row>
                  <Form.Control
                    type='text'
                    placeholder='Uživatelské jméno'
                    value={loginUserName}
                    onChange={(e) => setLoginUserName(e.target.value)}
                  />
                </Row>
              </Form.Group>
              <Form.Group controlId='formPassword' className='mt-4'>
                <Row>
                  <Col className='ps-0 pe-0 col-9'>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'} // change type based on showPassword state
                      placeholder='Heslo'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                  <Col className='ps-0 pe-0'>
                    <div className='d-grid'>
                      <Button
                        variant='danger'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeSlashFill /> : <EyeFill />}
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
      <FooterManagement />
    </Fragment>
  );
};

export default LoginPage;
