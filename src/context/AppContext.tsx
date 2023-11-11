import React, { ReactNode, createContext, useContext, useState } from 'react';
import { AppContextType } from '../types/AppContextType';
import Clinic from '../types/ClinicType';
import Doctor from '../types/DoctorType';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [doctorList, setDoctorList] = useState<Doctor[] | null>(null);
  const [clinicList, setClinicList] = useState<Clinic[] | null>(null);

  const contextValue: AppContextType = {
    doctorList,
    setDoctorList,
    clinicList,
    setClinicList,
    selectedDoctor,
    selectedClinic,
    setSelectedDoctor,
    setSelectedClinic,
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
