import { useAppContext } from 'context/AppContext';
import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import config from '../../config/config.json'
interface MessageToastProps {
	message: string;
}

const MessageToast: React.FC<MessageToastProps> = ({ message }) => {
	const { showMessageToast, setShowMessageToast } = useAppContext();

	useEffect(() => {
		if (showMessageToast) {
			const timer = setTimeout(() => {
				setShowMessageToast(false);
			}, config.general.toastTimeoutInSeconds*1000); // Auto-hide after set interval from config

			return () => {
				clearTimeout(timer);
			};
		}
	}, [showMessageToast, setShowMessageToast]);

	return (
		<Alert
			variant='success'
			onClose={() => setShowMessageToast(false)}
			style={{
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				zIndex: 9999,
				fontSize: '2rem',
			}}
			show={showMessageToast}>
			{message}
		</Alert>
	);
};

export default MessageToast;
