import Clinic from './ClinicType';
import Doctor from './DoctorType';
import Reservation from './ReservationType';

export type AppContextType = {
  doctorList: Doctor[] | null;
  clinicList: Clinic[] | null;
  selectedDoctor: Doctor | null;
  selectedClinic: Clinic | null;
  setSelectedDoctor: React.Dispatch<React.SetStateAction<Doctor | null>>;
  setSelectedClinic: React.Dispatch<React.SetStateAction<Clinic | null>>;
  setDoctorList: React.Dispatch<React.SetStateAction<Doctor[] | null>>;
  setClinicList: React.Dispatch<React.SetStateAction<Clinic[] | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setReservationsList: React.Dispatch<React.SetStateAction<Reservation[] | null>>;
  reservationsList: Reservation[] | null;
};
