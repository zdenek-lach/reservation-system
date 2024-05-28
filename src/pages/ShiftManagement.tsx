import axios from 'axios';
import { getFormattedDate } from 'components/WeekPicker';
import ClinicSelector from 'components/management-components/ClinicSelector';
import DoctorSelector from 'components/management-components/DoctorSelector';
import { useClinics } from 'hooks/useClinics';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import {
  ArrowCounterclockwise,
  Pencil,
  Trash3Fill,
} from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import { authHeader } from 'security/AuthService';
import Clinic from 'types/ClinicType';
import type { ShiftApi, ShiftApiNormal } from 'types/ShiftType';
import config from '../../config/config.json';
import Doctor from './../types/DoctorType';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Console } from 'console';

const ShiftManagement = () => {
  const [loadingShifts, setLoadingShifts] = useState(true);
  const [errorShifts, setErrorShifts] = useState<string>('');
  const [filterDoctor, setFilterDoctor] = useState<Doctor | null>(null);
  const [filterClinic, setFilterClinic] = useState<Clinic | null>(null);
  const [isFilterByDayEnabled, setIsFilterByDayEnabled] = useState(false);
  const { loadingClinics, errorClinics } = useClinics();
  const [filteredShiftList, setFilteredShiftList] = useState<ShiftApi[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedShift, setSelectedShift] = useState<ShiftApi | null>(null);
  const [shiftList, setShiftList] = useState<ShiftApiNormal[]>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get(config.api.shiftApi.listNormal, {
          headers: {
            ...authHeader(),
          },
        });
        setShiftList(response.data);
        setFilteredShiftList(response.data);
        setLoadingShifts(false);
      } catch (err: any) {
        setErrorShifts(err.message);
        setLoadingShifts(false);
      }
    };

    fetchShifts();
  }, [setShiftList]);

  const applyFilters = () => {
    if (!shiftList) return;
    let filtered = [...shiftList];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (shift) =>
          shift.doctor.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          shift.doctor.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          shift.clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shift.id.toString().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected date
    if (isFilterByDayEnabled) {
      filtered = filtered.filter((shift) =>
        shift.shifts.some(
          (shiftDetail) =>
            getFormattedDate(new Date(shiftDetail.date)) ===
            getFormattedDate(new Date(selectedDate))
        )
      );
    }

    // Filter by selected doctor
    if (filterDoctor) {
      filtered = filtered.filter(
        (shift) => shift.doctor.id === filterDoctor.id
      );
    }

    // Filter by selected clinic
    if (filterClinic) {
      filtered = filtered.filter(
        (shift) => shift.clinic.id === filterClinic.id
      );
    }

    setFilteredShiftList(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [
    searchTerm,
    filterDoctor,
    filterClinic,
    selectedDate,
    isFilterByDayEnabled,
  ]);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };
  const handleDeleteShift = (date, time) => {
    // Find the shift in the original shiftList with matching date and time
    const shiftToDelete = shiftList.find((shift) =>
      shift.shifts.some(
        (shiftDetail) =>
          getFormattedDate(new Date(shiftDetail.date)) ===
            getFormattedDate(new Date(date)) && shiftDetail.time === time
      )
    );

    // If the shift is found, extract its ID and delete it
    if (shiftToDelete) {
      const shiftIdToDelete = shiftToDelete.id;
      const deleteUrl = `${config.api.shiftApi.delete}/${shiftIdToDelete}`;

      console.warn(`deleting shift id: ${shiftIdToDelete}`);
      axios
        .delete(deleteUrl, {
          headers: {
            ...authHeader(),
          },
        })
        .then((response) => {
          console.log(`Successfully deleted shift id: ${shiftIdToDelete}`);
          console.log(response.status);

          // Remove the deleted shift from the shiftList
          if (shiftList) {
            const updatedShifts = shiftList.filter(
              (shift) => shift.id !== shiftIdToDelete
            );
            setShiftList(updatedShifts);
          }
        })
        .catch((error) => {
          console.error(`Error deleting shift id: ${shiftIdToDelete}`, error);
        });
    } else {
      console.error(`Shift not found for date: ${date} and time: ${time}`);
    }
  };

  function addMinutes(date, minutes, offset = false) {
    let offsetTime = 0;
    //Offset by to hours if needed
    if (offset == true) {
      offsetTime = 2 * 60;
    }
    return new Date(date.getTime() + (minutes - offsetTime) * 60000);
  }

  const localizer = momentLocalizer(moment);
  let testData = [];
  shiftList?.forEach((doctorGroup) => {
    const from: number = doctorGroup.timeFrom.split(
      ':'
    )[0] as unknown as number;
    const to = doctorGroup.timeTo.split(':')[0] as unknown as number;
    testData.push({
      id: doctorGroup.id,
      title:
        doctorGroup.doctor.firstName +
        ' ' +
        doctorGroup.doctor.lastName +
        '; ' +
        doctorGroup.clinic.name,
      start: addMinutes(new Date(doctorGroup.date), from * 60, true),
      end: addMinutes(new Date(doctorGroup.date), to * 60, true),
      color: 'red',
    });
  });

  return (
    <>
      <Container
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          paddingTop: '30px',
          alignContent: 'center',
        }}
      >
        <h1>Správa směn</h1>
      </Container>
      <Container
        style={{
          height: '40rem',
        }}
      >
        <Calendar
          localizer={localizer}
          events={testData}
          startAccessor='start'
          endAccessor='end'
          dayLayoutAlgorithm='no-overlap'
        />
      </Container>
    </>
  );
};

export default ShiftManagement;
