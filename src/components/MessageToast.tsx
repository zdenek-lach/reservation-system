import { useAppContext } from 'context/AppContext';
import React from 'react';
import { Alert } from 'react-bootstrap';

interface MessageToastProps {
	message: string;
}

const MessageToast: React.FC<MessageToastProps> = ({ message }) => {
	const { showMessageToast, setShowMessageToast } = useAppContext();

	const handleClose = () => setShowMessageToast(false);

	return (
		<Alert
			variant='success'
			onClose={handleClose}
			style={{
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				zIndex: 9999,
				fontSize: '1.5rem',
			}}
			show={showMessageToast}>
			{message}
		</Alert>
	);
};

export default MessageToast;
