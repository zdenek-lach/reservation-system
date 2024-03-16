import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
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
import { refreshCheck } from '../security/AuthService';
import FooterManagement from 'components/FooterManagement';
import { Fragment } from 'react';

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

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#b02a37';
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#dc3545';
  };

  const renderCard = (
    title: string,
    icon: JSX.Element,
    onClick: () => void,
    altStyle?: CSSProperties
  ) => (
    <Col md={4} key={title}>
      <Card
        style={cardStyle}
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardLeave}
        onClick={onClick}
      >
        {icon}
        {title}
      </Card>
    </Col>
  );

  return (
    <Fragment>
      <Container>
        <Row className="mb-4 mt-4">
          {renderCard('Můj profil', <PersonLinesFill style={iconStyle} />, () =>
            navigate('my-profile')
          )}
          {renderCard('Moje směny', <CalendarPlusFill style={iconStyle} />, () =>
            navigate('my-shifts')
          )}
          {renderCard('Moje rezervace', <NodePlusFill style={iconStyle} />, () =>
            navigate('my-reservations')
          )}
        </Row>
        <Row className="mb-4">
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
      <FooterManagement></FooterManagement>
    </Fragment>
  );
};

export default Management;
