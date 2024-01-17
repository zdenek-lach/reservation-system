import ClinicDropdown from 'components/ClinicDropdown';
import DoctorDropdown from 'components/DoctorDropdown';
import WeekGrid from 'components/WeekGrid';
import WeekPicker from 'components/WeekPicker';
import { useAppContext } from 'context/AppContext';
import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import DoctorCard from '../components/DoctorCard';

const AppointmentPage = () => {
  const { selectedDoctor } = useAppContext();

  const [currentWeek, setCurrentWeek] = useState(() => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust to Monday
    date.setDate(diff);
    date.setHours(0, 0, 0, 0); // set time to 00:00:00.000
    return date;
  });

  return (
    <Container
      fluid
      style={{ minHeight: '100vh', backgroundPosition: 'center' }}
    >
      <Row className="mb-4">
        {/* Left Section: Week, Doctor, and Clinic Dropdowns */}
        <Col
          md
          style={{
            backgroundColor: 'rgba(255, 0, 0, 0.4)',
            padding: '20px',
            borderRadius: '15px',
            marginTop: '20px',
            marginLeft: '20px',
          }}
        >
          <Row className="justify-content-center mb-4">
            <WeekPicker
              currentWeek={currentWeek}
              setCurrentWeek={setCurrentWeek}
            />
          </Row>
          <Row className="justify-content-center">
            <Col className="mb-4 d-flex justify-content-center">
              <DoctorDropdown />
            </Col>
            <Col className="mb-4 d-flex justify-content-center">
              <ClinicDropdown />
            </Col>
          </Row>
          <Card style={{ backgroundColor: '#666' }}>
            <WeekGrid startOfWeek={currentWeek} />
          </Card>
        </Col>

        {/* Right Section: Doctor Card */}
        {selectedDoctor != null && (
          <Col
            style={{
              backgroundColor: 'rgba(255, 0, 0, 0.4)',
              padding: '20px',
              marginTop: '20px',
              marginLeft: '20px',
              marginRight: '20px',
              borderRadius: '15px',
            }}
          >
            <DoctorCard doctor={selectedDoctor} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default AppointmentPage;
