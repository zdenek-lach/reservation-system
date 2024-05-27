import axios from 'axios';
import '@bitnoi.se/react-scheduler/dist/style.css';
import { Scheduler, SchedulerData } from '@bitnoi.se/react-scheduler';
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
import type { ShiftApi } from 'types/ShiftType';
import config from '../../config/config.json';
import Doctor from './../types/DoctorType';
import { langs } from './../language/cz-translation';

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
  const [shiftList, setShiftList] = useState<ShiftApi[]>();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get(config.api.shiftApi.list, {
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

  const [filterButtonState, setFilterButtonState] = useState(0);

  let test: SchedulerData = [];
  let testData: any[] = [];
  shiftList?.forEach((doctorGroup) => {
    doctorGroup.shifts.forEach((shift) => {
      testData.push({
        id: shift.id,
        startDate: shift.date,
        endDate: shift.date,
        occupancy: 3600,
        title: shift.time,
        subtitle: '',
        description: '',
        bgColor: 'rgb(255, 175, 69)',
      });
    });
  });

  test = [
    {
      id: 'cokoliv-klidne-doctor-id',
      label: {
        icon: 'https://picsum.photos/24',
        title: 'Roman',
        subtitle: 'Pekala',
      },
      data: testData,
    },
  ];

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
        className='container'
        style={{
          height: '40rem',
          width: '100%',
          position: 'relative',
        }}
      >
        <Scheduler
          data={test}
          isLoading={false}
          onRangeChange={(newRange) => console.log(newRange)}
          onTileClick={(clickedResource) => console.log(clickedResource)}
          onItemClick={(item) => console.log(item)}
          onFilterData={() => {
            // Some filtering logic...
            setFilterButtonState(1);
          }}
          onClearFilterData={() => {
            // Some clearing filters logic...
            setFilterButtonState(0);
          }}
          config={{
            zoom: 1,
            filterButtonState,
            lang: 'cs',
            translations: langs,
          }}
        />
      </Container>
    </>
  );
};

export default ShiftManagement;

// color 1 = rgb(255, 175, 69)
// color 2 = rgb(251, 109, 72)
// color 3 = rgb(215, 75, 118)
// color 4 = rgb(103, 63, 105)
