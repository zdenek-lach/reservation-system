import axios from 'axios';

import WeekPicker, { getFormattedDate } from 'components/WeekPicker';
import AddReservation from 'components/management-components/AddReservation';
import ClinicSelector from 'components/management-components/ClinicSelector';
import EditReservation from 'components/management-components/EditReservation';
import FooterManagement from 'components/management-components/FooterManagement';
import { useAppContext } from 'context/AppContext';
import { useEffect, useState } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import {
	ArrowCounterclockwise,
	InfoCircle,
	Trash3Fill,
} from 'react-bootstrap-icons';
import { authHeader, fetchLoggedDoctor } from 'security/AuthService';
import { CenterSpinner } from 'styles/StyledComponentsLib';
import Clinic from 'types/ClinicType';
import Reservation from 'types/ReservationType';
import config from '../../config/config.json';
import Doctor from './../types/DoctorType';

const MyReservations = () => {
	const { reservationsList, setReservationsList, currentWeek, setCurrentWeek } =
		useAppContext();

	const [showInfoModal, setShowInfoModal] = useState(false);
	const [loggedInDoctor, setLoggedInDoctor] = useState<Doctor | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [filterClinic, setFilterClinic] = useState<Clinic | null>(null);
	const [isWeekFilterEnabled, setIsWeekFilterEnabled] = useState(false);
	const [loading, setLoading] = useState(true);

	const [selectedReservation, setSelectedReservation] =
		useState<Reservation | null>(null);

	const [searchTerm, setSearchTerm] = useState('');

	const handleShowInfoModal = (reservation: Reservation) => {
		setSelectedReservation(reservation);
		setShowInfoModal(true);
	};

	const handleCloseModal = () => {
		setSelectedReservation(null);
		setShowInfoModal(false);
	};

	const handleDeleteReservation = (reservation: Reservation) => {
		const deleteUrl = config.api.reservationsApi.delete + `/${reservation.id}`;

		axios
			.delete(deleteUrl, {
				headers: { ...authHeader() },
			})
			.then((response) => {
				console.log(`Successfully deleted reservation ${reservation.id}`);
				console.log(response.status);

				if (reservationsList) {
					const updatedReservations = reservationsList.filter(
						(res) => res.id !== reservation.id
					);
					setReservationsList(updatedReservations);
				}
			})
			.catch((error) => {
				console.error(`Error deleting reservation ${reservation.id}:`, error);
			});
		// Close the modal
		setShowDeleteModal(false);
	};

	const handleShowDeleteModal = (reservation: Reservation) => {
		setSelectedReservation(reservation);
		setShowDeleteModal(true);
	};

	const startOfWeek = (date: Date) => {
		const result = new Date(date);
		result.setDate(result.getDate() - result.getDay() + 1);
		return result;
	};

	const endOfWeek = (date: Date) => {
		const result = new Date(date);
		result.setDate(result.getDate() - result.getDay() + 7);
		return result;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetchLoggedDoctor();
				setLoggedInDoctor(response);
				setLoading(false);
			} catch (error) {
				console.error('Failed to fetch user:', error);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		console.log('Waiting for logged-in api');
		return <CenterSpinner />;
	}
	return (
		<>
			<Container
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0)',
					padding: '30px',
					alignContent: 'center',
				}}>
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Vyhledat'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<ClinicSelector
						selectedClinic={filterClinic}
						setSelectedClinic={setFilterClinic}
					/>
					<Button
						variant='danger'
						onClick={() => {
							setSearchTerm('');
							setFilterClinic(null);
						}}>
						<ArrowCounterclockwise />
					</Button>
					<Form.Check
						type='checkbox'
						label='Filtrovat dle týdnu'
						checked={isWeekFilterEnabled}
						onChange={(e) => setIsWeekFilterEnabled(e.target.checked)}
					/>
					{isWeekFilterEnabled && (
						<WeekPicker
							currentWeek={currentWeek}
							setCurrentWeek={setCurrentWeek}
						/>
					)}
				</Form.Group>
				<Table
					striped
					bordered
					hover>
					<thead>
						<tr>
							<th>Číslo</th>
							<th>Jméno</th>
							<th>Příjmení</th>
							<th>Datum a čas</th>
							<th>Doktor</th>
							<th>Ambulance</th>
							<th></th>
						</tr>
					</thead>
					<tbody
						style={{
							backgroundColor: 'white',
							padding: '20px',
							borderRadius: '15px',
						}}>
						{reservationsList != null &&
							reservationsList
								.filter(
									(reservation) =>
										reservation.client.phoneNumber.includes(searchTerm) ||
										reservation.client.firstName
											.toLowerCase()
											.includes(searchTerm.toLowerCase()) ||
										reservation.client.lastName
											.toLowerCase()
											.includes(searchTerm.toLowerCase()) ||
										reservation.client.email
											.toLowerCase()
											.includes(searchTerm.toLowerCase()) ||
										reservation.note
											.toLowerCase()
											.includes(searchTerm.toLowerCase())
								)
								.filter(
									(reservation) =>
										loggedInDoctor == null ||
										reservation.doctor.id === loggedInDoctor.id
								)
								.filter(
									(reservation) =>
										filterClinic == null ||
										reservation.clinic.id === filterClinic.id
								)
								.filter(
									(reservation) =>
										!isWeekFilterEnabled ||
										(new Date(reservation.date) >= startOfWeek(currentWeek) &&
											new Date(reservation.date) <= endOfWeek(currentWeek))
								)

								.map((reservation) => (
									<tr key={reservation.id}>
										<td>{reservation.id}</td>
										<td>{reservation.client.firstName}</td>
										<td>{reservation.client.lastName}</td>
										<td>
											{getFormattedDate(new Date(reservation.date))}
											{' v '}
											{reservation.time}
										</td>
										<td>
											{reservation.doctor.firstName}{' '}
											{reservation.doctor.lastName}
										</td>
										<td>{reservation.clinic.name}</td>
										<td>
											<Button
												variant='info'
												size='lg'
												className='mr-1 me-1'
												onClick={() => handleShowInfoModal(reservation)}>
												<InfoCircle />
											</Button>
											<EditReservation
												Reservation={reservation as Reservation}
												ReservationList={reservationsList}
												SetReservationList={setReservationsList}
											/>
											<Button
												variant='danger'
												size='lg'
												onClick={() => handleShowDeleteModal(reservation)}>
												<Trash3Fill />
											</Button>
										</td>
									</tr>
								))}
					</tbody>
				</Table>
				<AddReservation managementMode={true} />
				<Modal
					show={showInfoModal}
					onHide={handleCloseModal}>
					<Modal.Header closeButton>
						<Modal.Title>Informace o rezervaci</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{selectedReservation && (
							<div>
								<p>
									<strong>Číslo:</strong> {selectedReservation.id}
								</p>
								<p>
									<strong>Jméno:</strong> {selectedReservation.client.firstName}
								</p>
								<p>
									<strong>Příjmení:</strong>{' '}
									{selectedReservation.client.lastName}
								</p>
								<p>
									<strong>Telefon:</strong>
									{selectedReservation.client.phoneNumber}
								</p>
								<p>
									<strong>E-mail:</strong> {selectedReservation.client.email}
								</p>
								<p>
									<strong>Datum: </strong>
									{getFormattedDate(new Date(selectedReservation.date))}
								</p>
								<p>
									<strong>Čas:</strong> {selectedReservation.time}
								</p>
								<p>
									<strong>Doktor:</strong>{' '}
									{selectedReservation.doctor.firstName}+{' '}
									{selectedReservation.doctor.lastName}
								</p>
								<p>
									<strong>Ambulance:</strong>
									{selectedReservation.clinic.name}
								</p>
								<p>
									<strong>Poznámka:</strong>
									{selectedReservation.note}
								</p>
							</div>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='secondary'
							onClick={handleCloseModal}>
							Zavřít
						</Button>
					</Modal.Footer>
				</Modal>
				<Modal
					show={showDeleteModal}
					onHide={() => setShowDeleteModal(false)}
					// backdrop='static'
					// keyboard={false}
				>
					<Modal.Header closeButton>
						<Modal.Title>Potvrzení</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h5>Jste si jistí, že chcete odebrat tuto rezervaci?</h5>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='secondary'
							onClick={() => setShowDeleteModal(false)}>
							Ne
						</Button>
						<Button
							variant='danger'
							onClick={() => handleDeleteReservation(selectedReservation)}>
							Ano
						</Button>
					</Modal.Footer>
				</Modal>
			</Container>
			<FooterManagement />
		</>
	);
};

export default MyReservations;
