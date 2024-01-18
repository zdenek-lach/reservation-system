import { useAppContext } from 'context/AppContext';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import packageJson from '../../package.json';

const NavBar: React.FC = () => {
  let location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  if (location.pathname.includes('splash-screen')) return null;

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Rezervační systém Artromedi</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Item className="text-light">
              verze {packageJson.version}
            </Nav.Item>
            {isLoggedIn ? (
              <Nav.Link href="/" onClick={handleLogout}>
                Log Out
              </Nav.Link>
            ) : (
              <Nav.Link href="/login">Log In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
