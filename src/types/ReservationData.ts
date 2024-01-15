import Clinic from './ClinicType';
import Doctor from './DoctorType';

interface ReservationData {
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  comment: string;
  doctor: Doctor;
  clinic: Clinic;
}
export default ReservationData;
