import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import { useEffect, useMemo, useState } from 'react';
import {
	Button,
	Col,
	Container,
	Dropdown,
	Form,
	FormCheck,
	InputGroup,
	Row,
} from 'react-bootstrap';
import { authHeader } from 'security/AuthService';
import { CenterSpinner } from 'styles/StyledComponentsLib';
import Doctor from 'types/DoctorType';
import config from '../../../config/config.json';
import WeekGrid2, { TimeSlot } from './WeekGrid2';

type PresetSelectorProps = {
	presetName?: string;
	setPresetName?: (value: string) => void;
	clickedButtons: TimeSlot[];
	loggedInDoctor: Doctor | null;
	loading: boolean;
};

const PresetSelector = ({
	presetName,
	setPresetName,
	loggedInDoctor,
	loading,
}) => {
	const { selectedPreset, setSelectedPreset, currentWeek } = useAppContext();
	const [presetList, setPresetList] = useState([]);
	const [clickedButtons, setClickedButtons] = useState<TimeSlot[]>([]);
	const [shouldPresetBeRenamed, setShouldPresetBeRenamed] = useState(true);
	// Fetch presets from the API
	const fetchPresets = async () => {
		try {
			const response = await axios.get(config.api.presetsApi.list, {
				headers: {
					...authHeader(),
					'Content-Type': 'application/json',
				},
			});

			if (response.status === 200) {
				console.log('Retrieving presets was successful');
				setPresetList(response.data);
			} else {
				console.log('You have caused an error!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPresets();
	}, []);

	// Delete the selected preset with BE API call
	const deleteSelectedPreset = () => {
		axios
			.delete(config.api.presetsApi.delete + `/${selectedPreset.id}`, {
				headers: { ...authHeader() },
			})
			.then((response) => {
				console.log(`Successfully deleted preset ${selectedPreset.id}`);
				console.log(response.status);

				setSelectedPreset(null);
				fetchPresets();
			})
			.catch((error) => {
				console.error(`Error deleting preset ${selectedPreset.id}:`, error);
			});
	};

	const editSelectedPreset = () => {
		// Create a new object based on the current selectedPreset
		const updatedPreset = { ...selectedPreset };

		// Reset the days
		updatedPreset.monday = [];
		updatedPreset.tuesday = [];
		updatedPreset.wednesday = [];
		updatedPreset.thursday = [];
		updatedPreset.friday = [];
		updatedPreset.saturday = [];
		updatedPreset.sunday = [];

		// Populate the days based on the clickedButtons
		clickedButtons.forEach((button) => {
			const dayOfWeek = new Date(button.day).toLocaleString('en-US', {
				weekday: 'long',
			});

			switch (dayOfWeek.toLowerCase()) {
				case 'monday':
					updatedPreset.monday.push(button.time);
					break;
				case 'tuesday':
					updatedPreset.tuesday.push(button.time);
					break;
				case 'wednesday':
					updatedPreset.wednesday.push(button.time);
					break;
				case 'thursday':
					updatedPreset.thursday.push(button.time);
					break;
				case 'friday':
					updatedPreset.friday.push(button.time);
					break;
				case 'saturday':
					updatedPreset.saturday.push(button.time);
					break;
				case 'sunday':
					updatedPreset.sunday.push(button.time);
					break;
				default:
					console.log(
						`Day ${dayOfWeek} is not accounted for in the Preset object.`
					);
			}
		});

		// Send the updatedPreset in the PUT request
		axios
			.put(
				config.api.presetsApi.edit + `/${selectedPreset.id}`,
				updatedPreset,
				{
					headers: { ...authHeader() },
				}
			)
			.then((response) => {
				console.log(`Successfully edited preset ${selectedPreset.id}`);
				console.log(response.status);
				fetchPresets();
			})
			.catch((error) => {
				console.error(`Error editing preset ${selectedPreset.id}:`, error);
			});
	};
	// Submit a new preset to BE API
	const submitNewPreset = async () => {
		// ... (create newPreset object based on clickedButtons)
		const newPreset = {
			id: null,
			doctorId: loggedInDoctor ? loggedInDoctor.id : null,
			name: presetName,
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: [],
			sunday: [],
		};

		clickedButtons.forEach((button) => {
			const dayOfWeek = new Date(button.day).toLocaleString('en-US', {
				weekday: 'long',
			});

			switch (dayOfWeek.toLowerCase()) {
				case 'monday':
					newPreset.monday.push(button.time);
					break;
				case 'tuesday':
					newPreset.tuesday.push(button.time);
					break;
				case 'wednesday':
					newPreset.wednesday.push(button.time);
					break;
				case 'thursday':
					newPreset.thursday.push(button.time);
					break;
				case 'friday':
					newPreset.friday.push(button.time);
					break;
				case 'saturday':
					newPreset.saturday.push(button.time);
					break;
				case 'sunday':
					newPreset.sunday.push(button.time);
					break;
				default:
					console.log(
						`Day ${dayOfWeek} is not accounted for in the Preset object.`
					);
			}
		});
		try {
			const response = await axios.post(config.api.presetsApi.add, newPreset, {
				headers: {
					...authHeader(),
					'Content-Type': 'application/json',
				},
			});

			if (response.status === 200) {
				console.log('Adding preset was successful');
				setSelectedPreset(newPreset);
				fetchPresets();
			} else {
				console.error('You have caused an error!');
			}
		} catch (error) {
			console.log(error);
		}
	};
	if (loading) {
		console.log('Waiting for logged-in api');
		return <CenterSpinner />;
	}

	const initialShifts = useMemo(() => {
		if (!selectedPreset) return [];

		const daysOfWeek = [
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
			'sunday',
		];
		let shifts = [];

		daysOfWeek.forEach((day, index) => {
			const dayDate = new Date(
				currentWeek.getFullYear(),
				currentWeek.getMonth(),
				currentWeek.getDate() + index,
				0,
				0,
				0,
				0 // Sets the time to 00:00:00.000
			);

			selectedPreset[day].forEach((time) => {
				shifts.push({ day: dayDate, time });
			});
		});

		return shifts;
	}, [selectedPreset, currentWeek]);
	// Render the dropdown and preset options/buttons
	return (
		<Container>
			<Row>
				<Col sm={3}>
					<Dropdown>
						<Dropdown.Toggle
							variant='success'
							className='me-2 mt-3 mb-3'>
							{selectedPreset != null
								? `Preset ${selectedPreset.name}`
								: 'Vytvořit nový preset'}
							<Dropdown.Menu>
								<Dropdown.Item onClick={() => setSelectedPreset(null)}>
									Nový Preset
								</Dropdown.Item>
								{presetList &&
									presetList.map((preset) => (
										<Dropdown.Item
											key={preset.id}
											onClick={() => setSelectedPreset(preset)}>
											{`Preset ${preset.name}`}
										</Dropdown.Item>
									))}
							</Dropdown.Menu>
						</Dropdown.Toggle>
					</Dropdown>
				</Col>
				<Col sm={3}>
					{selectedPreset != null && (
						<Button
							variant='danger'
							onClick={deleteSelectedPreset}>
							Odstranit vybraný preset
						</Button>
					)}
				</Col>
			</Row>
			<Row>
				<Col sm={4}>
					{selectedPreset == null && (
						<InputGroup>
							{shouldPresetBeRenamed && (
								<Form.Control
									placeholder='Zvolte jméno nového presetu'
									aria-describedby='preset-name'
									value={presetName || ''}
									onChange={(e) => setPresetName(e.target.value)}
								/>
							)}
						</InputGroup>
					)}
					{selectedPreset != null && (
						<Form>
							<FormCheck
								type='switch'
								label='Ponechat jméno presetu'
								checked={shouldPresetBeRenamed}
								onChange={() =>
									setShouldPresetBeRenamed((prevValue) => !prevValue)
								}/>
						</Form>
					)}
				</Col>
			</Row>
			<Row>
				<Col sm={12}>
					{selectedPreset != null && !shouldPresetBeRenamed && (
						<InputGroup className='mb-3'>
							<Form.Control
								placeholder='Jméno presetu'
								aria-label='Jméno presetu'
								aria-describedby='preset-name'
								value={selectedPreset.name.toString()}
								onChange={(e) => {
									setPresetName(e.target.value);
									setSelectedPreset({
										...selectedPreset,
										name: e.target.value,
									});
								}}
							/>
						</InputGroup>
					)}
				</Col>
			</Row>
			<Row>
				<Col sm={12}>
					<WeekGrid2
						startOfWeek={currentWeek}
						initialShifts={initialShifts}
						setClickedButtons={setClickedButtons}
						isPresetMode={true}
					/>
				</Col>
			</Row>
			<Row>
				<Col sm={4}>
					{selectedPreset == null && (
						<Button
							variant='primary'
							onClick={submitNewPreset}>
							Přidat nový preset
						</Button>
					)}
					{selectedPreset != null && (
						<Button
							variant='warning'
							onClick={editSelectedPreset}>
							Uložit provedené změny
						</Button>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default PresetSelector;
