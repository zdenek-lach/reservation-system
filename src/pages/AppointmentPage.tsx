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
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import WeekPicker from 'components/WeekPicker';
import { useAppContext } from 'context/AppContext';
import { addDays, eachHourOfInterval, format, startOfWeek } from 'date-fns';
import { useClinics } from 'hooks/useClinics';
import { useDoctors } from 'hooks/useDoctors';
import { useState } from 'react';
import AppointmentDoctorCard from '../components/AppointmentDoctorCard';

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
                  selectedDoctor.surname
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
      const { id, title, firstName, surname } = doctor;

      return (
        <MenuItem key={id} onClick={() => setSelectedDoctor(doctor)}>
          {`${id} ${title} ${firstName} ${surname}`}
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

  const weekGrid = () => {
    const days = ['Po', 'Út', 'St', 'Čt', 'Pá']; // Remove weekend days

    const generateTimeSlots = () => {
      const startHour = 7;
      const endHour = 19;
      const timeSlots = eachHourOfInterval({
        start: new Date(0, 0, 0, startHour),
        end: new Date(0, 0, 0, endHour),
      });
      return timeSlots.map((time) => format(time, 'HH:mm'));
    };

    return (
      <Table variant="striped" colorScheme="teal" size="sm">
        <Tbody>
          {days.map((day) => (
            <Tr key={day}>
              <Td>{day}</Td>
              {generateTimeSlots().map((time) => (
                <Td key={`${day}-${time}`}>{time}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
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
            <WeekPicker />
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
          <Box backgroundColor="#666">{weekGrid()}</Box>
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
            <AppointmentDoctorCard doctor={selectedDoctor} />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default AppointmentPage;
