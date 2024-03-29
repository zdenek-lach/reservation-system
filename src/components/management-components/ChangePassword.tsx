import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import React, { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import config from '../../../config/config.json';

const ChangePassword: React.FC = () => {
	const [show, setShow] = useState(false);
	const [oldPassword, setOldPassword] = useState('');
	const { username } = useAppContext();
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
			<Button
				variant='primary'
				onClick={handleShow}>
				Změnit heslo
			</Button>

			<Modal
				show={show}
				onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Change Password</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Současné heslo</Form.Label>
							<Form.Control
								type='password'
								placeholder='Vložte své současné heslo'
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Nové heslo</Form.Label>
							<Form.Control
								type='password'
								placeholder='Vložte nové heslo'
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Nové heslo znovu</Form.Label>
							<Form.Control
								type='password'
								placeholder='Vložte nové heslo znovu -> (pro kontrolu)'
								value={repeatNewPassword}
								onChange={(e) => setRepeatNewPassword(e.target.value)}
							/>
						</Form.Group>
						<Form.Group>
							{passwordMismatch && (
								<Alert variant='danger'>Nové hesla se neshodují!</Alert>
							)}
						</Form.Group>
						<Form.Group>
							<Button
								variant='primary'
								type='submit'>
								Odeslat
							</Button>
						</Form.Group>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ChangePassword;
