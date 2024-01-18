import Clinic from 'types/ClinicType';
import Doctor from 'types/DoctorType';
import Client from './ClientType';
type Reservation = {
  id: number;
  clinic: Clinic;
  doctor: Doctor;
  client: Client;
  note: string;
  date: string;
  time: string;
};

export default Reservation;
