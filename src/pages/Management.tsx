import 'bootstrap/dist/css/bootstrap.min.css';
import FooterManagement from 'components/management-components/FooterManagement';
import { Fragment, useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import {
	Calendar4Week,
	CalendarPlusFill,
	ClipboardCheckFill,
	GearWide,
	NodePlusFill,
	PersonFillGear,
	PersonLinesFill,
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import Doctor from 'types/DoctorType';
import { fetchLoggedDoctor } from '../security/AuthService';
import {
	cardStyle,
	globalSettingsStyle,
	iconStyle,
} from '../styles/StyledComponentsLib';

const Management = () => {
	const navigate = useNavigate();
	const [doctor, setDoctor] = useState<Doctor | null>(null);
	const [loadingDoctor, setIsLoadingDoctor] = useState(true);

	const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.backgroundColor = '#b02a37';
	};

	const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		e.currentTarget.style.backgroundColor = '#dc3545';
	};

	useEffect(() => {
		fetchLoggedDoctor().then((user) => {
			setDoctor(user);
			setIsLoadingDoctor(false);
		});
	}, []);

	const renderCardCol = (
		title: string,
		icon: JSX.Element,
		onClick: () => void,
		isLoading?: boolean
	) => (
		<Col
			md={4}
			key={title}>
			<Card
				style={cardStyle}
				onMouseEnter={handleCardHover}
				onMouseLeave={handleCardLeave}
				onClick={onClick}>
				{!isLoading && (
					<>
						{icon}
						{title}
					</>
				)}
				{isLoading && <Spinner />}
			</Card>
		</Col>
	);

	return (
		<Fragment>
			<Container>
				<Row className='mb-4 mt-4'>
					{renderCardCol(
						'Můj profil',
						<PersonLinesFill style={iconStyle} />,
						() => navigate('my-profile'),
						loadingDoctor
					)}
					{renderCardCol(
						'Moje směny',
						<CalendarPlusFill style={iconStyle} />,
						() => navigate('my-shifts'),
						loadingDoctor
					)}
					{renderCardCol(
						'Moje rezervace',
						<NodePlusFill style={iconStyle} />,
						() => navigate('my-reservations'),
						loadingDoctor
					)}
				</Row>
				<Row className='mb-4'>
					{renderCardCol(
						'Správa rezervací',
						<ClipboardCheckFill style={iconStyle} />,
						() => navigate('reservation-management')
					)}
					{renderCardCol(
						'Správa zaměstnanců',
						<PersonFillGear style={iconStyle} />,
						() => navigate('employee-management')
					)}
					{renderCardCol(
						'Správa směn',
						<Calendar4Week style={iconStyle} />,
						() => navigate('shift-management')
					)}
				</Row>
				<Row>
					<Col
						md={4}
						key={'Globální nastavení'}
						onClick={() => {
							navigate('global-settings');
						}}>
						<Card
							style={globalSettingsStyle}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = '#808080';
							}}>
							<GearWide style={iconStyle} />
							Globální nastavení
						</Card>
					</Col>
				</Row>
			</Container>
			<FooterManagement />
		</Fragment>
	);
};

export default Management;
