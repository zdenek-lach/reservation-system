import { useAppContext } from 'context/AppContext';
import React from 'react';
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import packageJson from '../../package.json';
import logoText from '../assets/logoText.png';

const NavBar: React.FC = () => {
  let location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  if (location.pathname.includes('splash-screen')) return null;

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const navigate = useNavigate();

  return (
    <Navbar
      variant='dark'
      expand='lg'
      className='p-3 border-bottom border-danger'
    >
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate('appointment-page');
          }}
          className='d-flex align-items-center'
        >
          <div className='secondary'>
            <Image src={logoText} width={250} className='p-0 m-0' />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
            <Nav.Item className=' p-2 d-flex align-items-center'>
              verze {packageJson.version}
            </Nav.Item>

            {isLoggedIn ? (
              <>
                <Button
                  variant='outline-danger'
                  onClick={() => navigate('/management')}
                  className='me-2'
                >
                  Management
                </Button>
                <Button
                  href='/'
                  onClick={handleLogout}
                  variant='outline-danger'
                  className='d-flex align-items-center'
                >
                  Odhlásit se
                </Button>
              </>
            ) : (
              <Button
                className='d-flex align-items-center'
                href='/login'
                variant='danger'
              >
                Přihlásit se
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
