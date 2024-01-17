import { eachHourOfInterval, format } from 'date-fns';
import { Table } from 'react-bootstrap';
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
    <Table striped size="sm" className="my-3">
      <tbody>
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
            <tr key={day} className="bg-light text-dark">
              <td>{day}</td>
              {generateTimeSlots().map((time) => (
                <td key={`${day}-${time}`} className="p-3">
                  <TimeBlock time={time} date={dayDate} />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default WeekGrid;
