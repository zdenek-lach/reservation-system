import Clinic from './ClinicType';
import Doctor from './DoctorType';

interface ReservationDto {
  employeeId: number;
  clinicId: string;
  date: string;
  timeFrom: string;
  note: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}
export default ReservationDto;
