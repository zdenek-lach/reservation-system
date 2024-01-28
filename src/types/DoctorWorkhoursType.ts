import Clinic from 'types/ClinicType'
type DoctorWorkhours = {
  id: number;
  date: Date;
  clinic: Clinic
  timeFrom: string;
  timeTo: string;
};
export default DoctorWorkhours;
