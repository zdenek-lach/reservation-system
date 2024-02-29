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
import Reservation from 'types/ReservationType';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [doctorList, setDoctorList] = useState(() => {
    const storedContext = localStorage.getItem('appContext');
    return storedContext ? JSON.parse(storedContext).doctorList : null;
  });
  const [currentWeek, setCurrentWeek] = useState(() => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(diff);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const [clinicList, setClinicList] = useState(() => {
    const storedContext = localStorage.getItem('appContext');
    return storedContext ? JSON.parse(storedContext).clinicList : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedContext = localStorage.getItem('appContext');
    return storedContext ? JSON.parse(storedContext).isLoggedIn : false;
  });
  const [reservationsList, setReservationsList] = useState<
    Reservation[] | null
  >(null);
  const [showMessageToast, setShowMessageToast] = useState(false);
  //const [username, setUsername ] = useState('');

  // Load context from local storage on initial mount
  useEffect(() => {
    const storedContext = localStorage.getItem('appContext');
    if (storedContext) {
      const parsedContext = JSON.parse(storedContext);
      setSelectedDoctor(parsedContext.selectedDoctor);
      setSelectedClinic(parsedContext.selectedClinic);
      setIsLoggedIn(parsedContext.isLoggedIn);
      setReservationsList(parsedContext.reservationsList);
      setShowMessageToast(parsedContext.showMessageToast); // Set the value from storage
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
      reservationsList,
      showMessageToast,
      currentWeek,
      setCurrentWeek,
      username,
      setUsername,
    };
    localStorage.setItem('appContext', JSON.stringify(contextToStore));
  }, [
    doctorList,
    clinicList,
    selectedDoctor,
    selectedClinic,
    isLoggedIn,
    reservationsList,
    showMessageToast,
    currentWeek,
    setCurrentWeek,
    username,
    setUsername,
  ]);

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
    reservationsList,
    setReservationsList,
    showMessageToast,
    setShowMessageToast,
    currentWeek,
    setCurrentWeek,
    username,
    setUsername
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
