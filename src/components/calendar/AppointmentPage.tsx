import { Box, Flex, Heading, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import {
  CalendarPanel,
  Month_Names_Short,
  Weekday_Names_Short,
} from 'chakra-dayzed-datepicker';
import { useAppContext } from 'context/AppContext';
import {
  addDays,
  eachHourOfInterval,
  format,
  startOfWeek,
  subDays,
} from 'date-fns';
import { useState } from 'react';
import AppointmentDoctorCard from './AppointmentDoctorCard';
import Time from './Time';

const AppointmentPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { selectedDoctor } = useAppContext();
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start week on Monday
  const weekEnd = addDays(weekStart, 6);

  const [isSelected, setIsSelected] = useState(false);

  const handleSelectingTime = () => {
    setIsSelected((prevState) => !prevState);
  };

  const SingleCalendarDemo = () => {
    const demoDate = new Date();
    const [date, setDate] = useState(demoDate);

    const handleOnDateSelected = (props: {
      date: Date;
      nextMonth: boolean;
      prevMonth: boolean;
      selectable: boolean;
      selected: boolean;
      today: boolean;
    }) => {
      const { date } = props;
      if (date instanceof Date && !isNaN(date.getTime())) {
        setDate(date);
      }
    };

    return (
      <Box>
        <Box fontSize="lg" fontWeight="bold" mb={4}>
          {format(date, 'yyyy-MM-dd')}
        </Box>
        <CalendarPanel
          dayzedHookProps={{
            showOutsideDays: false, // Hide days outside the current month
            onDateSelected: handleOnDateSelected,
            selected: date,
            minDate: subDays(demoDate, 8),
            maxDate: addDays(demoDate, 8),
          }}
          configs={{
            dateFormat: 'yyyy-MM-dd',
            monthNames: Month_Names_Short,
            dayNames: Weekday_Names_Short,
            firstDayOfWeek: 1, // Monday as the first day
          }}
        />
      </Box>
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
                <Td key={`${day}-${time}`}>
                  <Time
                    time={time}
                    onClick={handleSelectingTime}
                    isSelected={isSelected}
                  />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  };

  return (
    <Box>
      <Heading as="h1" size="lg" mb={4}>
        Vyberte si datum
      </Heading>
      <Flex direction={{ base: 'column', md: 'row' }} mb={4}>
        <Box flex={1} mr={{ md: 4 }}>
          <SingleCalendarDemo />
        </Box>
        {selectedDoctor != null && (
          <Box flex={1}>
            <AppointmentDoctorCard doctor={selectedDoctor} />
          </Box>
        )}
      </Flex>
      {weekGrid()}
    </Box>
  );
};

export default AppointmentPage;
