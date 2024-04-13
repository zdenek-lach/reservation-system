import axios from 'axios';
import { getFormattedDate } from 'components/WeekPicker';
import { useClinics } from 'hooks/useClinics';
import { useDoctors } from 'hooks/useDoctors';
import { useEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { authHeader } from 'security/AuthService';
import Clinic from 'types/ClinicType';
import { type Shift, type ShiftApi } from 'types/ShiftType';
import config from '../../config/config.json';
import Doctor from './../types/DoctorType';

const ShiftManagement = () => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [loadingShifts, setLoadingShifts] = useState(true);
	const [errorShifts, setErrorShifts] = useState<string>('');
	// State variables for edited shift details
	const [editedDate, setEditedDate] = useState('');
	const [editedTime, setEditedTime] = useState('');
	const [editedClinic, setEditedClinic] = useState<Clinic | null>(null);
	const [editedDoctor, setEditedDoctor] = useState<Doctor | null>(null);
	const [filterDoctor, setFilterDoctor] = useState<Doctor | null>(null);
	const [filterClinic, setFilterClinic] = useState<Clinic | null>(null);
	const [isWeekFilterEnabled, setIsWeekFilterEnabled] = useState(false);

	const { loadingDoctors, errorDoctors } = useDoctors();
	const { loadingClinics, errorClinics } = useClinics();

	const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

	const [searchTerm, setSearchTerm] = useState('');

	const [shiftList, setShiftList] = useState<ShiftApi[]>();

	useEffect(() => {
		const fetchShifts = async () => {
			try {
				const response = await axios.get(config.api.shiftApi.list, {
					headers: {
						...authHeader(),
					},
				});
				setShiftList(response.data);
				setLoadingShifts(false);
			} catch (err: any) {
				setErrorShifts(err.message);
				setLoadingShifts(false);
			}
		};

		fetchShifts();
	}, [setShiftList]);

	return (
		<Container>
			<Form.Group>
				<Form.Control
					type='text'
					placeholder='Search'
					// Implement search functionality here
				/>
			</Form.Group>
			<Table
				striped
				bordered
				hover>
				<thead>
					<tr>
						<th>Shift ID</th>
						<th>Doctor</th>
						<th>Clinic</th>
						<th>Date</th>
						<th>Time</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{shiftList &&
						shiftList.flatMap((shift: ShiftApi) =>
							shift.shifts.map((shiftDetail, index) => (
								<tr key={`${shift.id}-${index}`}>
									<td>{shift.id}</td>
									<td>
										{shift.doctor.title} {shift.doctor.firstName}{' '}
										{shift.doctor.lastName}
									</td>
									<td>
										{shift.clinic.name} {shift.clinic.location}
									</td>
									<td>
										{shiftDetail?.day && getFormattedDate(shiftDetail.date)}
									</td>
									<td>{shiftDetail.time}</td>
									<td>
										<Button
											variant='info'
											size='lg'
											className='mr-1 me-1'>
											{/* Implement show info functionality here */}
										</Button>
										<Button
											variant='warning'
											size='lg'
											className='mr-1 me-1'>
											{/* Implement edit functionality here */}
										</Button>
										<Button
											variant='danger'
											size='lg'>
											{/* Implement delete functionality here */}
										</Button>
									</td>
								</tr>
							))
						)}
				</tbody>
			</Table>
		</Container>
	);
};

export default ShiftManagement;
