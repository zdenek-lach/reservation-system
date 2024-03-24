import 'bootstrap/dist/css/bootstrap.min.css';
import FooterManagement from 'components/management-components/FooterManagement';
import { Fragment, useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import {
  CalendarPlusFill,
  ClipboardCheckFill,
  GearWide,
  NodePlusFill,
  PersonFillGear,
  PersonLinesFill,
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import { CSSProperties } from 'styled-components';
import Doctor from 'types/DoctorType';
import { fetchLoggedUser } from '../security/AuthService';

const cardStyle: CSSProperties = {
  borderRadius: '15px',
  fontSize: '2em',
  backgroundColor: '#dc3545',
  color: '#ffffff',
  padding: '20px',
  textAlign: 'center',
  marginBottom: '20px',
  alignItems: 'center',
  transition: 'background-color 0.3s ease-in-out',
};

const globalSettingsStyle: CSSProperties = {
  ...cardStyle,
  backgroundColor: '#808080',
};

const iconStyle: CSSProperties = {
  color: '#ffffff',
  fontSize: '2em',
  transition: 'color 0.3s ease-in-out',
};

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
    fetchLoggedUser().then((user) => {
      setDoctor(user);
      setIsLoadingDoctor(false);
    });
  }, []);

  const renderCard = (
    title: string,
    icon: JSX.Element,
    onClick: () => void,
    isLoading?: boolean
  ) => (
    <Col md={4} key={title}>
      <Card
        style={cardStyle}
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardLeave}
        onClick={onClick}
      >
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
          {renderCard(
              'Můj profil',
              <PersonLinesFill style={iconStyle} />,
              () => navigate('my-profile'),
              loadingDoctor
            )}
          {renderCard(
            'Moje směny',
            <CalendarPlusFill style={iconStyle} />,
            () => navigate('my-shifts'),
            loadingDoctor
          )}
          {renderCard(
            'Moje rezervace',
            <NodePlusFill style={iconStyle} />,
            () => navigate('my-reservations'),
            loadingDoctor
          )}
        </Row>
        <Row className='mb-4'>
          {renderCard(
            'Správa rezervací',
            <ClipboardCheckFill style={iconStyle} />,
            () => navigate('reservation-management')
          )}
          {renderCard(
            'Správa zaměstnanců',
            <PersonFillGear style={iconStyle} />,
            () => navigate('employee-management')
          )}
          <Col
            md={4}
            key={'Globální nastavení'}
            onClick={() => {
              navigate('global-settings');
            }}
          >
            <Card
              style={globalSettingsStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#808080';
              }}
            >
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
