import React from 'react';
import { useAppContext } from '../AppContext';

const Header: React.FC = () => {
  const { selectedDoctor, selectedClinic } = useAppContext();

  const showSelectedDoctor = () => {
    if (selectedDoctor && selectedDoctor.firstName) {
      return <div>Zvolený lékař: {selectedDoctor.firstName}</div>;
    }
  };

  const showSelectedClinic = () => {
    if (selectedClinic && selectedClinic.name !== 'temp Clinic') {
      return <div>Zvolená klinika: {selectedClinic.name}</div>;
    }
  };

  return (
    <div>
      <div>
        <div>Artromedi - Rezervační systém</div>
        <div />
        <span>{showSelectedDoctor()}</span>
        <span>{showSelectedClinic()}</span>
      </div>
    </div>
  );
};

export default Header;
