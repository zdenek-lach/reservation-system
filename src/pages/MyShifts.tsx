import axios from 'axios';
import WeekPicker from 'components/WeekPicker';
import ClinicSelector from 'components/management-components/ClinicSelector';
import FooterManagement from 'components/management-components/FooterManagement';
import PresetSelector from 'components/management-components/PresetSelector';
import WeekGrid2 from 'components/management-components/WeekGrid2';
import { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { authHeader, fetchLoggedDoctor } from 'security/AuthService';
import styled from 'styled-components';
import { CenterSpinner } from 'styles/StyledComponentsLib';
import Clinic from 'types/ClinicType';
import Doctor from 'types/DoctorType';
import config from '../../config/config.json';
import { type Shift as TimeSlot } from '../types/ShiftType';

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

    //Send only current week
    let numberOfDays = 5;
    let weekDays = [];
    for (let index = 0; index < numberOfDays; index++) {
      const dayDate = new Date(
        currentWeek.getFullYear(),
        currentWeek.getMonth(),
        currentWeek.getDate() + index,
        0,
        0,
        0,
        0 // Sets the time to 00:00:00.000
      );
      weekDays.push(dayDate);
    }
    let oneWeek = clickedButtons.filter((button) =>
      weekDays.some((day) => {
        return (
          button.day.getDate() == day.getDate() &&
          button.day.getDay() == day.getDay() &&
          button.day.getFullYear() == day.getFullYear() &&
          button.time != ''
        );
      })
    );

    // Build the shifts array from clickedButtons
    let shifts = oneWeek.map((slot) => ({
      date: getFormatedDateAsNeeded(slot.day, options),
      time: slot.time,
    }));

    //Magic that conjures empty day so that backend knows it should delete them
    let excludeDays = weekDays.filter((day) => {
      let markForDelete = true;
      oneWeek.forEach((dayOfWeek) => {
        if (
          dayOfWeek.day.getDate() == day.getDate() &&
          dayOfWeek.day.getDay() == day.getDay() &&
          dayOfWeek.day.getFullYear() == day.getFullYear()
        ) {
          markForDelete = false;
        }
      });
      return markForDelete;
    });
    let excludedShifts = excludeDays.map((slot) => ({
      date: getFormatedDateAsNeeded(slot, options),
      time: null,
    }));

    excludedShifts.forEach((excludedShift) => shifts.push(excludedShift));

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

            {selectedClinic != null ? (
              <PresetSelector
                isReadOnly={true}
                loggedInDoctor={loggedInDoctor}
                loading={loading}
                setInitialShifts={setInitialShifts}
                currentWeek={currentWeek}
              />
            ) : (
              <Dropdown>
                <Dropdown.Toggle variant='success' className='me-2 mt-3 mb-3'>
                  Vyberte preset
                </Dropdown.Toggle>
              </Dropdown>
            )}

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
      <FooterManagement />
    </Fragment>
  );
};

export default MyShifts;
