import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AppContextType } from 'types/AppContextType';
import Clinic from 'types/ClinicType';
import Doctor from 'types/DoctorType';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [doctorList, setDoctorList] = useState<Doctor[] | null>(null);
  const [clinicList, setClinicList] = useState<Clinic[] | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load context from local storage on initial mount
  useEffect(() => {
    const storedContext = localStorage.getItem('appContext');
    if (storedContext) {
      const parsedContext = JSON.parse(storedContext);
      setDoctorList(parsedContext.doctorList);
      setClinicList(parsedContext.clinicList);
      setSelectedDoctor(parsedContext.selectedDoctor);
      setSelectedClinic(parsedContext.selectedClinic);
      setIsLoggedIn(parsedContext.isLoggedIn);
    }
  }, []);

  // Save context to local storage whenever it changes
  useEffect(() => {
    const contextToStore = {
      doctorList,
      clinicList,
      selectedDoctor,
      selectedClinic,
      isLoggedIn,
    };
    localStorage.setItem('appContext', JSON.stringify(contextToStore));
  }, [doctorList, clinicList, selectedDoctor, selectedClinic, isLoggedIn]);

  const contextValue: AppContextType = {
    doctorList,
    setDoctorList,
    clinicList,
    setClinicList,
    selectedDoctor,
    selectedClinic,
    setSelectedDoctor,
    setSelectedClinic,
    isLoggedIn,
    setIsLoggedIn,
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
