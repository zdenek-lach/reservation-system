import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import React, { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import config from '../../config/config.json';

const ChangePassword: React.FC = () => {
  const [show, setShow] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const { username, setUsername } = useAppContext();
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword !== repeatNewPassword) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);
    const passwordData = {
      oldPassword,
      newPassword,
    };
    axios
      .post(config.api.authApi.changePassword, passwordData)
      .then((response) => {
        console.log(`Successfully changed password`);
        console.log(response.status);
        handleClose();
      })
      .catch((error) => {
        console.error(`Error while changing password:`, error);
      });
  };

  return (
    <>
      <div>
        Přihlášený uživatel: <h2>{username}</h2>
      </div>
      <Button variant="primary" onClick={handleShow}>
        Změnit heslo
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formOldPassword">
              <Form.Label>Současné heslo</Form.Label>
              <Form.Control
                type="password"
                placeholder="Vložte původní heslo"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formNewPassword">
              <Form.Label>Nové heslo</Form.Label>
              <Form.Control
                type="password"
                placeholder="Vložte nové heslo"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formRepeatNewPassword">
              <Form.Label>Nové heslo znovu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Vložte znovu nové heslo (pro kontrolu)"
                value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}
              />
            </Form.Group>

            {passwordMismatch && (
              <Alert variant="danger">Nové hesla se neshodují!</Alert>
            )}

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePassword;
