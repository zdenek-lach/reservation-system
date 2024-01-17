import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
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

// const [isHoveredOver, setIsHoveredOver] = useState(false);

const cardStyle: CSSProperties = {
  borderRadius: '15px',
  fontSize: '2em',
  backgroundColor: 'rgba(255, 0, 0, 0.4)',
  color: '#ffffff',
  padding: '20px',
  textAlign: 'center',
  marginBottom: '20px',
  alignItems: 'center',
};
const globalSettingsStyle: CSSProperties = {
  ...cardStyle,
  backgroundColor: '#808080', // This is a grey color
};
const iconStyle: CSSProperties = {
  transition: 'color 0.3s ease-in-out',
  color: '#ffffff',
  fontSize: '2em',
};
const iconStyleHover: CSSProperties = {
  transition: 'color 0.3s ease-in-out',
  color: 'black',
  fontSize: '2em',
};

const Management = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="mb-4 mt-4">
        <Col md={4}>
          <Card
            style={cardStyle}
            onClick={() => {
              navigate('my-profile');
            }}
          >
            <PersonLinesFill
              // style={isHoveredOver ? iconStyleHover : iconStyle}
              style={iconStyle}
            />
            Můj profil
          </Card>
        </Col>
        <Col md={4}>
          <Card
            style={cardStyle}
            onClick={() => {
              navigate('my-shifts');
            }}
          >
            <CalendarPlusFill style={iconStyle} />
            Moje směny
          </Card>
        </Col>
        <Col md={4}>
          <Card
            style={cardStyle}
            onClick={() => {
              navigate('my-reservations');
            }}
          >
            <NodePlusFill style={iconStyle} />
            Moje rezervace
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Card
            style={cardStyle}
            onClick={() => {
              navigate('reservation-management');
            }}
          >
            <ClipboardCheckFill style={iconStyle} />
            Správa rezervací
          </Card>
        </Col>
        <Col md={4}>
          <Card
            style={cardStyle}
            onClick={() => {
              navigate('employee-management');
            }}
          >
            <PersonFillGear style={iconStyle} />
            Správa zaměstnanců
          </Card>
        </Col>
        <Col md={4}>
          <Card
            style={globalSettingsStyle}
            onClick={() => {
              navigate('global-settings');
            }}
          >
            <GearWide style={iconStyle} />
            Globální nastaveni
          </Card>
        </Col>
      </Row>
      {/* Add more Rows and Cols as needed for other elements */}
    </Container>
  );
};

export default Management;
