import axios from 'axios';
import { getFormattedDate } from 'components/WeekPicker';
import ClinicSelector from 'components/management-components/ClinicSelector';
import DoctorSelector from 'components/management-components/DoctorSelector';
import { useClinics } from 'hooks/useClinics';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import {
	ArrowCounterclockwise,
	Pencil,
	Trash3Fill,
} from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import { authHeader } from 'security/AuthService';
import Clinic from 'types/ClinicType';
import type { ShiftApi } from 'types/ShiftType';
import config from '../../config/config.json';
import Doctor from './../types/DoctorType';

const ShiftManagement = () => {
	const [loadingShifts, setLoadingShifts] = useState(true);
	const [errorShifts, setErrorShifts] = useState<string>('');
	const [filterDoctor, setFilterDoctor] = useState<Doctor | null>(null);
	const [filterClinic, setFilterClinic] = useState<Clinic | null>(null);
	const [isFilterByDayEnabled, setIsFilterByDayEnabled] = useState(false);
	const { loadingClinics, errorClinics } = useClinics();
	const [filteredShiftList, setFilteredShiftList] = useState<ShiftApi[]>([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedShift, setSelectedShift] = useState<ShiftApi | null>(null);
	const [shiftList, setShiftList] = useState<ShiftApi[]>();
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const fetchShifts = async () => {
			try {
				const response = await axios.get(config.api.shiftApi.list, {
					headers: {
						...authHeader(),
					},
				});
				setShiftList(response.data);
				setFilteredShiftList(response.data);
				setLoadingShifts(false);
			} catch (err: any) {
				setErrorShifts(err.message);
				setLoadingShifts(false);
			}
		};

		fetchShifts();
	}, [setShiftList]);

	const applyFilters = () => {
		if (!shiftList) return;
		let filtered = [...shiftList];

		// Filter by search term
		if (searchTerm) {
			filtered = filtered.filter(
				(shift) =>
					shift.doctor.firstName
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					shift.doctor.lastName
						.toLowerCase()
						.includes(searchTerm.toLowerCase()) ||
					shift.clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					shift.id.toString().includes(searchTerm.toLowerCase())
			);
		}

		// Filter by selected date
		if (isFilterByDayEnabled) {
			filtered = filtered.filter((shift) =>
				shift.shifts.some(
					(shiftDetail) =>
						getFormattedDate(new Date(shiftDetail.date)) ===
						getFormattedDate(new Date(selectedDate))
				)
			);
		}

		// Filter by selected doctor
		if (filterDoctor) {
			filtered = filtered.filter(
				(shift) => shift.doctor.id === filterDoctor.id
			);
		}

		// Filter by selected clinic
		if (filterClinic) {
			filtered = filtered.filter(
				(shift) => shift.clinic.id === filterClinic.id
			);
		}

		setFilteredShiftList(filtered);
	};

	useEffect(() => {
		applyFilters();
	}, [
		searchTerm,
		filterDoctor,
		filterClinic,
		selectedDate,
		isFilterByDayEnabled,
	]);

	const handleDateChange = (date: any) => {
		setSelectedDate(date);
	};
	const handleDeleteShift = (date, time) => {
		// Find the shift in the original shiftList with matching date and time
		const shiftToDelete = shiftList.find((shift) =>
			shift.shifts.some(
				(shiftDetail) =>
					getFormattedDate(new Date(shiftDetail.date)) === getFormattedDate(new Date(date)) &&
					shiftDetail.time === time
			)
		);

		// If the shift is found, extract its ID and delete it
		if (shiftToDelete) {
			const shiftIdToDelete = shiftToDelete.id;
			const deleteUrl = `${config.api.shiftApi.delete}/${shiftIdToDelete}`;

			console.warn(`deleting shift id: ${shiftIdToDelete}`);
			axios
				.delete(deleteUrl, {
					headers: {
						...authHeader(),
					},
				})
				.then((response) => {
					console.log(`Successfully deleted shift id: ${shiftIdToDelete}`);
					console.log(response.status);

					// Remove the deleted shift from the shiftList
					if (shiftList) {
						const updatedShifts = shiftList.filter(
							(shift) => shift.id !== shiftIdToDelete
						);
						setShiftList(updatedShifts);
					}
				})
				.catch((error) => {
					console.error(`Error deleting shift id: ${shiftIdToDelete}`, error);
				});
		} else {
			console.error(`Shift not found for date: ${date} and time: ${time}`);
		}
	};

	return (
		<>
			<Container
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0)',
					padding: '30px',
					alignContent: 'center',
				}}>
				<h1>Správa směn</h1>
				<Row>
					<Form.Control
						type='text'
						placeholder='Search'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</Row>
				<Row>
					<Col
						m={2}
						className='align-self-center'>
						<DoctorSelector setDoctorToThis={setFilterDoctor} />
					</Col>
					<Col
						m={2}
						className='align-self-center'>
						<ClinicSelector
							selectedClinic={filterClinic}
							setSelectedClinic={setFilterClinic}
						/>
					</Col>
					<Col
						m={2}
						className='align-self-center'>
						<Form.Switch
							label='Filtrovat konkrétní den'
							onChange={() => setIsFilterByDayEnabled(!isFilterByDayEnabled)}
							inline
						/>
					</Col>
					{isFilterByDayEnabled && (
						<Col
							m={2}
							className='align-self-center'>
							<DatePicker
								selected={selectedDate}
								onChange={handleDateChange}
								dateFormat='dd-MM-yyyy'
							/>
						</Col>
					)}

					<Col
						m={2}
						className='align-self-center'>
						<Button
							variant='danger'
							onClick={() => {
								setSearchTerm('');
								setFilterDoctor(null);
								setFilterClinic(null);
								setSelectedDate(new Date());
								setIsFilterByDayEnabled(false);
							}}>
							<ArrowCounterclockwise />
						</Button>
					</Col>
				</Row>
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
						{filteredShiftList &&
							filteredShiftList.flatMap((shift: ShiftApi) => {
								// Get unique dates for the current shift
								const uniqueDates = [
									...new Set(
										shift.shifts.map((shiftDetail) =>
											getFormattedDate(new Date(shiftDetail.date))
										)
									),
								];

								return uniqueDates.map((date, index) => (
									<React.Fragment key={`${shift.id}-${date}`}>
										{/* Render a row for the date */}
										{index === 0 && (
											<tr>
												<td rowSpan={uniqueDates.length}>{shift.id}</td>
												<td colSpan={4}>
													<strong>Date: {date}</strong>
												</td>
												<td>
													{/* Render delete button only on the group line */}
													<Button
														variant='danger'
														size='lg'
														onClick={() => handleDeleteShift(shift.id)}>
														<Trash3Fill />
													</Button>
												</td>
											</tr>
										)}
										{/* Render shift details for the current date */}
										{shift.shifts
											.filter(
												(shiftDetail) =>
													getFormattedDate(new Date(shiftDetail.date)) === date
											)
											.map((shiftDetail, idx) => (
												<tr key={`${shift.id}-${date}-${idx}`}>
													<td></td>
													<td>
														{shift.doctor.title} {shift.doctor.firstName}{' '}
														{shift.doctor.lastName}
													</td>
													<td>
														{shift.clinic.name} {shift.clinic.location}
													</td>
													<td>
														{getFormattedDate(new Date(shiftDetail.date))}
													</td>
													<td>{shiftDetail.time}</td>
													{/* <td>
														<Button
															variant='warning'
															size='lg'
															className='mr-1 me-1'>
															<Pencil />
														</Button>
													</td> */}
												</tr>
											))}
									</React.Fragment>
								));
							})}
					</tbody>
				</Table>
			</Container>
		</>
	);
};

export default ShiftManagement;
