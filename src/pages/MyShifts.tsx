import ClinicSelector from 'components/ClinicSelector';
import DoctorSelector from 'components/DoctorSelector';
import WeekGrid2, { TimeSlot } from 'components/WeekGrid2';
import WeekPicker from 'components/WeekPicker';
import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Clinic from 'types/ClinicType';
import Doctor from 'types/DoctorType';

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const StyledForm = styled(Form)`
  margin-bottom: 20px;
`;

const MyShifts = () => {
  const [currentWeek, setCurrentWeek] = useState(() => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust to Monday
    date.setDate(diff);
    date.setHours(0, 0, 0, 0); // set time to 00:00:00.000
    return date;
  });
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [clickedButtons, setClickedButtons] = useState<TimeSlot[]>([]);
  const [initialShifts, setInitialShifts] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (selectedDoctor) {
      const shifts = selectedDoctor.availableClinics.map((clinic) => ({
        day: new Date(clinic.date),
        time: clinic.timeFrom,
      }));
      setInitialShifts(shifts);

      console.warn(
        selectedDoctor.availableClinics.map((clinic) => ({
          day: new Date(clinic.date),
          time: clinic.timeFrom,
        }))
      );
    }
  }, [selectedDoctor]);
  return (
    <StyledContainer>
      <Row>
        <Col>
          <h2>My Shifts</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <WeekPicker
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
          />
          <DoctorSelector
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
          />
          <ClinicSelector
            selectedClinic={selectedClinic}
            setSelectedClinic={setSelectedClinic}
          />
          <WeekGrid2
            startOfWeek={currentWeek}
            setClickedButtons={setClickedButtons}
            initialShifts={selectedDoctor?.availableClinics.map((clinic) => ({
              day: new Date(clinic.date),
              time: clinic.timeFrom,
            }))}
            readOnly={true}
          />
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default MyShifts;
