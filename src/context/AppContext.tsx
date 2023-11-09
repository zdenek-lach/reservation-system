import React, { ReactNode, createContext, useContext, useState } from 'react';
import Clinic from '../types/ClinicType';
import Doctor from '../types/DoctorType';

type AppContextType = {
  selectedDoctor: Doctor | null;
  selectedClinic: Clinic | null;
  setDoctorAndClinic: (doctor: Doctor, clinic: Clinic) => void;
  showHeader: Boolean;
  setShowHeader: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [showHeader, setShowHeader] = useState<boolean>(false);

  const setDoctorAndClinic = (doctor: Doctor, clinic: Clinic) => {
    setSelectedDoctor(doctor);
    setSelectedClinic(clinic);
  };

  const contextValue: AppContextType = {
    selectedDoctor,
    selectedClinic,
    setDoctorAndClinic,
    showHeader,
    setShowHeader,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
