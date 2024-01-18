import Clinic from 'types/ClinicType'
type DoctorWorkhours = {
  id: number;
  date: Day;
  clinic: Clinic
  timeFrom: string;
  timeTo: string;
};
export default DoctorWorkhours;
