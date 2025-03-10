import type Clinic from './ClinicType';
import type Doctor from './DoctorType';

export type Shift = {
	id?: number;
	day?: Date;
	date?: Date;
	time: string;
};

export type ShiftApi = {
	id: number;
	doctor: Doctor;
	clinic: Clinic;
	shifts: Shift[];
};
export default Shift;
