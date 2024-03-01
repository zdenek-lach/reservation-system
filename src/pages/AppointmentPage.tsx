import DoctorCard from 'components/DoctorCard';
import MessageToast from 'components/MessageToast';
import ReservationClinicDropdown from 'components/ReservationClinicDropdown';
import ReservationDoctorDropdown from 'components/ReservationDoctorDropdown';
import WeekGrid from 'components/WeekGrid';
import WeekPicker from 'components/WeekPicker';
import { useAppContext } from 'context/AppContext';
import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const AppointmentPage = () => {
  const { selectedDoctor, showMessageToast, setShowMessageToast } =
    useAppContext();
  const [currentWeek, setCurrentWeek] = useState(() => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(diff);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  
  return (
    <Container
      fluid
      style={{ minHeight: '100vh', backgroundPosition: 'center' }}
    >
      {showMessageToast && (
        <div>
          <MessageToast message="Rezervace úspěšně vytvořena!" />
        </div>
      )}
      <Row className="mb-4">
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
              <ReservationDoctorDropdown />
            </Col>
            <Col className="mb-4 d-flex justify-content-center">
              <ReservationClinicDropdown />
            </Col>
          </Row>
          <Card style={{ backgroundColor: '#666' }}>
            <WeekGrid startOfWeek={currentWeek} />
          </Card>
        </Col>
        {}
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
