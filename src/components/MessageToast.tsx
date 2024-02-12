import { useAppContext } from 'context/AppContext';
import React from 'react';
import { Toast } from 'react-bootstrap';

interface MessageToastProps {
  message: string;
}

const MessageToast: React.FC<MessageToastProps> = ({ message }) => {
  const { showMessageToast, setShowMessageToast } = useAppContext();

  const handleClose = () => setShowMessageToast(false);

  return (
    <Toast
      onClose={handleClose}
      show={showMessageToast}
      delay={3000}
      autohide
      animation
      className="shadow-lg p-3 mb-5"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
      }}
    >
      <Toast.Body
        className=""
        style={{
          fontSize: '1.5rem',
          backgroundColor: 'green',
          color: '#fff',
        }}
      >
        {message}
      </Toast.Body>
    </Toast>
  );
};

export default MessageToast;
