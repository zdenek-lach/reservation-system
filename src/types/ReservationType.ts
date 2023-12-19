import Clinic from 'types/ClinicType';
import Doctor from 'types/DoctorType';
import Client from './ClientType';
type Reservation = {
  id: number;
  clinic: Clinic;
  doctor: Doctor;
  client: Client;
  note: string;
};

export default Reservation;
