import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from '@chakra-ui/react';
import WeekGrid from 'components/WeekGrid';
import WeekPicker from 'components/WeekPicker';
import { useAppContext } from 'context/AppContext';
import { addDays, startOfWeek } from 'date-fns';
import { useClinics } from 'hooks/useClinics';
import { useDoctors } from 'hooks/useDoctors';
import { useState } from 'react';
import DoctorCard from '../components/DoctorCard';

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    selectedDoctor,
    setSelectedDoctor,
    doctorList,
    clinicList,
    selectedClinic,
    setSelectedClinic,
  } = useAppContext();
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start week on Monday
  const weekEnd = addDays(weekStart, 6);

  const [isSelected, setIsSelected] = useState(false);
  const { loadingDoctors, errorDoctors } = useDoctors();
  const { loadingClinics, errorClinics } = useClinics();
  const [currentWeek, setCurrentWeek] = useState(() => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust to Monday
    date.setDate(diff);
    date.setHours(0, 0, 0, 0); // set time to 00:00:00.000
    return date;
  });

  const handleSelectingTime = () => {
    setIsSelected((prevState) => !prevState);
  };

  const renderDoctorDropdown = () => {
    return (
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {selectedDoctor != null
                ? selectedDoctor.title +
                  ' ' +
                  selectedDoctor.firstName +
                  ' ' +
                  selectedDoctor.lastName
                : 'Doctor'}
            </MenuButton>
            <MenuList>{listDoctorsAsMenuItems()}</MenuList>
          </>
        )}
      </Menu>
    );
  };

  const listDoctorsAsMenuItems = () => {
    if (!Array.isArray(doctorList) || doctorList.length === 0) {
      return <MenuItem key="empty">DoctorList is empty</MenuItem>;
    }

    return doctorList.map((doctor) => {
      const { id, title, firstName, lastName } = doctor;

      return (
        <MenuItem key={id} onClick={() => setSelectedDoctor(doctor)}>
          {`${id} ${title} ${firstName} ${lastName}`}
        </MenuItem>
      );
    });
  };

  const renderClinicDropdown = () => {
    return (
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {selectedClinic != null
                ? selectedClinic.name + ' ' + selectedClinic.location
                : 'Clinic'}
            </MenuButton>
            <MenuList>{listClinicsAsMenuItems()}</MenuList>
          </>
        )}
      </Menu>
    );
  };

  const listClinicsAsMenuItems = () => {
    if (!Array.isArray(clinicList) || clinicList.length === 0) {
      return <MenuItem key="empty">ClinicList is empty</MenuItem>;
    }

    return (
      <>
        {clinicList.map((clinic) => (
          <MenuItem key={clinic.id} onClick={() => setSelectedClinic(clinic)}>
            {clinic.id + clinic.name + ' ' + clinic.location}
          </MenuItem>
        ))}
      </>
    );
  };

  return (
    <Box minH="100vh" bgSize="cover" backgroundPosition="center">
      <Flex direction={{ base: 'column', md: 'row' }} mb={4} align="stretch">
        {/* Left Section: Week, Doctor, and Clinic Dropdowns */}
        <Box
          bg="rgba(255, 0, 0, 0.4)" // Adjust background color and opacity as needed
          p={5}
          flex={{ base: 1, md: 'auto' }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center" // Add this line
          mt="20px"
          ml="20px"
          borderRadius="15px"
        >
          <Box mb={4}>
            <WeekPicker
              currentWeek={currentWeek}
              setCurrentWeek={setCurrentWeek}
            />
          </Box>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justifyContent="center"
            flexGrow={1}
          >
            <Box mb={4} mr={{ md: 4 }}>
              {loadingDoctors ? (
                <Spinner />
              ) : errorDoctors ? (
                <Text>{errorDoctors}</Text>
              ) : (
                renderDoctorDropdown()
              )}
            </Box>
            <Box mb={4}>
              {loadingClinics ? (
                <Spinner />
              ) : errorClinics ? (
                <Text>{errorClinics}</Text>
              ) : (
                renderClinicDropdown()
              )}
            </Box>
          </Flex>
          <Box backgroundColor="#666">
            <WeekGrid startOfWeek={currentWeek} />
          </Box>
        </Box>

        {/* Right Section: Doctor Card */}
        {selectedDoctor != null && (
          <Box
            bg="rgba(255, 0, 0, 0.4)"
            p={4}
            flex={1}
            mt="20px"
            ml="20px"
            mr="20px"
            borderRadius="15px"
          >
            <DoctorCard doctor={selectedDoctor} />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default AppointmentPage;
