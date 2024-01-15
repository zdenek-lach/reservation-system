import { Box, Flex } from '@chakra-ui/react';
import ClinicDropdown from 'components/ClinicDropdown';
import DoctorDropdown from 'components/DoctorDropdown';
import WeekGrid from 'components/WeekGrid';
import WeekPicker from 'components/WeekPicker';
import { useAppContext } from 'context/AppContext';
import { useState } from 'react';
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
              <DoctorDropdown />
            </Box>
            <Box mb={4}>
              <ClinicDropdown />
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
