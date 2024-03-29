import axios from 'axios';
import WeekPicker from 'components/WeekPicker';
import ClinicSelector from 'components/management-components/ClinicSelector';
import FooterManagement from 'components/management-components/FooterManagement';
import WeekGrid2, {
  TimeSlot,
} from 'components/management-components/WeekGrid2';
import { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { authHeader, fetchLoggedDoctor } from 'security/AuthService';
import styled from 'styled-components';
import { CenterSpinner } from 'styles/StyledComponentsLib';
import Clinic from 'types/ClinicType';
import Doctor from 'types/DoctorType';
import config from '../../config/config.json';

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
  const [loggedInDoctor, setLoggedInDoctor] = useState<Doctor | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [loading, setLoading] = useState(true);
  const [clickedButtons, setClickedButtons] = useState<TimeSlot[]>([]);
  const [shiftsResponseData, setShiftsResponseData] = useState<any[]>([]);
  const [initialShifts, setInitialShifts] = useState<TimeSlot[]>([]);
  const formatDate = (shifts: any) => {
    let newShifts: TimeSlot[] = [];
    for (const shift of shifts) {
      // shift.date = format(parseISO(shift.date), 'MM/dd/yyyy');
      shift.date = new Date(shift.date);
      newShifts.push({ day: shift.date, time: shift.time });
    }
    return newShifts;
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

  useEffect(() => {
    axios
      .get(config.api.shiftApi.list, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        let shifts = response.data.map(
          (shiftsResponseData: {
            id: any;
            doctor: any;
            clinic: any;
            shifts: any;
          }) => ({
            id: shiftsResponseData.id,
            doctor: shiftsResponseData.doctor,
            clinic: shiftsResponseData.clinic,
            shifts: formatDate(shiftsResponseData.shifts),
          })
        );
        setShiftsResponseData(shifts);
      })
      .catch((error) => {
        console.error(`Error fetching shifts`, error);
      });
    setInitialShifts(getInitialShifts());
  }, [loggedInDoctor, selectedClinic]);
  const getInitialShifts = (): TimeSlot[] => {
    if (loggedInDoctor && selectedClinic) {
      let filtered = shiftsResponseData.filter((shiftsResponse) => {
        return (
          shiftsResponse.doctor.id == loggedInDoctor.id &&
          shiftsResponse.clinic.id == selectedClinic.id
        );
      });
      let finallyAllShifts: TimeSlot[] = [];
      filtered.forEach((item) => {
        for (const shift of item.shifts) {
          finallyAllShifts.push(shift);
        }
      });
      console.log(finallyAllShifts);
      return finallyAllShifts;
    } else {
      return [];
    }
  };
  const submitDoctorWorkHours = (e) => {
    e.preventDefault();

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    const getFormatedDateAsNeeded = (date: Date, options) => {
      let dateAndTime = new Date(date)
        .toLocaleTimeString('en-US', options)
        .split(',');
      let dateParts = dateAndTime[0].split('/');
      return `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
    };

    // Build the shifts array from clickedButtons
    let shifts = clickedButtons.map((slot) => ({
      //date: new Date(slot.day).toISOString().split('T')[0],
      date: getFormatedDateAsNeeded(slot.day, options),
      time: slot.time,
    }));

    // Build the data object to send to the backend
    let data = {
      doctor: loggedInDoctor,
      clinic: selectedClinic,
      shifts: shifts,
    };

    console.warn(data);
    axios
      .post(config.api.shiftApi.add, data, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(`Successfully added a shift`);
      })
      .catch((error) => {
        console.error(`Error adding a shift`, error);
      });
  };
  if (loading) {
    console.log('Waiting for logged-in api');
    return <CenterSpinner />;
  }
  return (
    <Fragment>
      <StyledContainer>
        <Row>
          <Col>
            <h2>Moje Směny</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <WeekPicker
              currentWeek={currentWeek}
              setCurrentWeek={setCurrentWeek}
            />
            <ClinicSelector
              selectedClinic={selectedClinic}
              setSelectedClinic={setSelectedClinic}
            />
            {/* <PresetSelector /> */}
            <WeekGrid2
              startOfWeek={currentWeek}
              setClickedButtons={setClickedButtons}
              initialShifts={initialShifts}
            />
          </Col>
        </Row>
        <Button variant='primary' onClick={submitDoctorWorkHours}>
          Uložit směny
        </Button>
      </StyledContainer>
      <FooterManagement></FooterManagement>
    </Fragment>
  );
};

export default MyShifts;
