import DoctorWorkhours from './DoctorWorkhoursType';

type Doctor = {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  points: string[];
  title: string;
  pictureId: number;
  availableClinics: DoctorWorkhours[];
};

export default Doctor;
