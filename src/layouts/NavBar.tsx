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
    <Navbar bg="danger" variant="dark" expand="lg" className="p-3">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate('appointment-page');
          }}
          className="d-flex align-items-center"
        >
          <div className="secondary">
            <Image src={logoText} width={300} thumbnail />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Item className="text-light p-2 d-flex align-items-center">
              verze {packageJson.version}
            </Nav.Item>

            {isLoggedIn ? (
              <>
                <Button
                  variant="secondary"
                  onClick={() => navigate('/management')}
                >
                  Management
                </Button>
                <Nav.Link
                  href="/"
                  onClick={handleLogout}
                  className="d-flex align-items-center"
                >
                  Log Out
                </Nav.Link>
              </>
            ) : (
              <Nav.Link className="d-flex align-items-center" href="/login">
                Log In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
