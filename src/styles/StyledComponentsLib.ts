import { Spinner } from 'react-bootstrap';
import styled, { type CSSProperties } from 'styled-components';

export const CenterSpinner = styled(Spinner)`
  display: block;
  position: fixed;
  z-index: 1031; 
  top: 50%;
  left: 50%; 
  transform: translate(
    -50%,
    -50%
  ); 
`;

export const cardStyle: CSSProperties = {
	borderRadius: '15px',
	fontSize: '2em',
	backgroundColor: '#dc3545',
	color: '#ffffff',
	padding: '20px',
	textAlign: 'center',
	marginBottom: '20px',
	alignItems: 'center',
	transition: 'background-color 0.3s ease-in-out',
};

export const globalSettingsStyle: CSSProperties = {
	...cardStyle,
	backgroundColor: '#808080',
};

export const iconStyle: CSSProperties = {
	color: '#ffffff',
	fontSize: '2em',
	transition: 'color 0.3s ease-in-out',
};
