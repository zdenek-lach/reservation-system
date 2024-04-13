import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { authHeader } from 'security/AuthService';
import ReservationData from 'types/ReservationData';
import ReservationDto from 'types/ReservationDtoType';
import config from '../../config/config.json';

interface ReservationSummaryProps {
	ReservationData: ReservationData | null;
	ShowSummary: boolean;
	SetSummary: (value: boolean) => void;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({
	ReservationData,
	ShowSummary,
	SetSummary,
}) => {
	const handleModalClose = () => {
		SetSummary(false);
	};

	const { setShowMessageToast } = useAppContext();

	const addDataToDB = async (dataToAdd: ReservationData) => {
		try {
			const reservationToAdd: ReservationDto = {
				clinicId: dataToAdd.clinic.id,
				date: dataToAdd.date,
				email: dataToAdd.email,
				employeeId: dataToAdd.doctor.id,
				name: dataToAdd.firstName,
				note: dataToAdd.comment,
				phone: dataToAdd.phone,
				surname: dataToAdd.lastName,
				timeFrom: dataToAdd.time,
			};

			const response = await axios.post(
				config.api.reservationsApi.add,
				reservationToAdd,
				{
					headers: {
						...authHeader(),
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.status === 200) {
				// OK, inform user the action has been succesful
				console.log('Adding reservation was succesful');
				setShowMessageToast(true);
			} else {
				console.log('You have caused an error!');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<Modal
				show={ShowSummary}
				onHide={handleModalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Shrnutí</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{ReservationData?.doctor != null &&
						ReservationData.clinic != null && (
							<>
								<p>
									Vybraný lékař: {ReservationData.doctor.title}{' '}
									{ReservationData.doctor.firstName}{' '}
									{ReservationData.doctor.lastName}
								</p>
								<p>
									Vybraná klinika: {ReservationData.clinic.name},{' '}
									{ReservationData.clinic.location}
								</p>
								<p>Vybrané datum: {ReservationData.date}</p>
								<p>Vybraný čas: {ReservationData.time}</p>
								<p>Jméno: {ReservationData.firstName}</p>
								<p>Příjmení: {ReservationData.lastName}</p>
								<p>Telefon: {ReservationData.phone}</p>
								<p>Email: {ReservationData.email}</p>
								<p>Komentář: {ReservationData.comment}</p>

								<Button
									variant='success'
									onClick={() => {
										addDataToDB(ReservationData);
										handleModalClose();
									}}>
									Odeslat
								</Button>
							</>
						)}
				</Modal.Body>
			</Modal>
		</>
	);
};
export default ReservationSummary;
