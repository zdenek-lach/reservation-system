import { Table, Tbody, Td, Tr } from '@chakra-ui/react';
import { eachHourOfInterval, format } from 'date-fns';
import TimeBlock from './TimeBlock';

interface WeekGridProps {
  startOfWeek: Date;
}
const WeekGrid: React.FC<WeekGridProps> = ({ startOfWeek }) => {
  const days = ['Po', 'Út', 'St', 'Čt', 'Pá'];

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
        {days.map((day, index) => {
          const dayDate = new Date(
            startOfWeek.getFullYear(),
            startOfWeek.getMonth(),
            startOfWeek.getDate() + index,
            0,
            0,
            0,
            0 // Sets the time to 00:00:00.000
          );
          return (
            <Tr key={day}>
              <Td>{day}</Td>
              {generateTimeSlots().map((time) => (
                <Td key={`${day}-${time}`}>
                  <TimeBlock time={time} date={dayDate} />
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default WeekGrid;
