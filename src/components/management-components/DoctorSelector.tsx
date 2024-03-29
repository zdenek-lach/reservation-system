import { useAppContext } from 'context/AppContext';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { fetchLoggedDoctor } from 'security/AuthService';
import Doctor from 'types/DoctorType';

interface DoctorSelectorProps {
	selectedDoctorProp?: Doctor | null;
	setSelectedDoctorProp?: Dispatch<SetStateAction<Doctor | null>>;
}

const DoctorSelector: React.FC<DoctorSelectorProps> = ({
	selectedDoctorProp,
	// : selectedDoctor
	setSelectedDoctorProp,
	// : setSelectedDoctor
}) => {
	const {
		doctorList,
		selectedDoctor: contextSelectedDoctor,
		setSelectedDoctor: contextSetSelectedDoctor,
		loggedInDoctor,
		setLoggedInDoctor,
	} = useAppContext();

	useEffect(() => {
		fetchLoggedDoctor().then((doctor) => {
			if (doctor != null) {
				setLoggedInDoctor(doctor);
			} else {
				console.error('Failed to fetch logged doctor!');
			}
		});
	}, []);

	return (
		<>
			{contextSelectedDoctor === null ||
				(loggedInDoctor === null && (
					<label>
						<Dropdown>
							<Dropdown.Toggle
								variant='success'
								className='me-3 mt-3 mb-3'>
								{loggedInDoctor != null
									? `${loggedInDoctor.title} ${loggedInDoctor.firstName} ${loggedInDoctor.lastName}`
									: 'Vyberte spravovaného doktora'}
							</Dropdown.Toggle>

							<Dropdown.Menu>
								{doctorList &&
									doctorList.map((doctor) => (
										<Dropdown.Item
											key={doctor.id}
											onClick={() => {
												contextSetSelectedDoctor(doctor),
													setLoggedInDoctor(doctor);
											}}>
											{`${doctor.title} ${doctor.firstName} ${doctor.lastName}`}
										</Dropdown.Item>
									))}
							</Dropdown.Menu>
						</Dropdown>
					</label>
				))}
		</>
	);
};

export default DoctorSelector;
