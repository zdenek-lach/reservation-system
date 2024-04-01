import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

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
