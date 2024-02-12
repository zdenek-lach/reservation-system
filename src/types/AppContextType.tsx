import Clinic from './ClinicType';
import Doctor from './DoctorType';
import Reservation from './ReservationType';

export type AppContextType = {
  doctorList: Doctor[] | null;
  setDoctorList: React.Dispatch<React.SetStateAction<Doctor[] | null>>;
  clinicList: Clinic[] | null;
  setClinicList: React.Dispatch<React.SetStateAction<Clinic[] | null>>;
  selectedDoctor: Doctor | null;
  selectedClinic: Clinic | null;
  setSelectedDoctor: React.Dispatch<React.SetStateAction<Doctor | null>>;
  setSelectedClinic: React.Dispatch<React.SetStateAction<Clinic | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  reservationsList: Reservation[] | null;
  setReservationsList: React.Dispatch<
    React.SetStateAction<Reservation[] | null>
  >;
  showMessageToast: boolean;
  setShowMessageToast: React.Dispatch<React.SetStateAction<boolean>>;
};
