import { eachHourOfInterval, format } from 'date-fns';
import { useState } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';

interface WeekGrid2Props {
  startOfWeek: Date;
}

const startHour = 7;
const endHour = 19;
const timeSlots = eachHourOfInterval({
  start: new Date(0, 0, 0, startHour),
  end: new Date(0, 0, 0, endHour),
}).map((time) => format(time, 'HH:mm'));

interface TimeSlot {
  day: Date;
  time: string;
}

const WeekGrid2: React.FC<WeekGrid2Props> = ({ startOfWeek }) => {
  const days = ['Po', 'Út', 'St', 'Čt', 'Pá'];

  const [selectedTimes, setSelectedTimes] = useState<TimeSlot[]>([]);

  const addOrRemoveSelectedTime = (dayDate: Date, time: string) => {
    const index = selectedTimes.findIndex(
      (selectedTime) =>
        selectedTime.day.getTime() === dayDate.getTime() &&
        selectedTime.time === time
    );

    if (index === -1) {
      setSelectedTimes((prevTimes) => [...prevTimes, { day: dayDate, time }]);
    } else {
      setSelectedTimes((prevTimes) => prevTimes.filter((_, i) => i !== index));
    }
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
              <td>
                {day}
                <Badge className="">
                  {dayDate.toLocaleDateString('cs-CZ')}
                </Badge>
              </td>
              {timeSlots.map((time) => {
                const isSelected = selectedTimes.some(
                  (selectedTime) =>
                    selectedTime.day.getTime() === dayDate.getTime() &&
                    selectedTime.time === time
                );
                return (
                  <td key={`${day}-${time}`} className="p-3">
                    <Button
                      style={{
                        borderRadius: '20px',
                      }}
                      variant={isSelected ? 'primary' : 'secondary'}
                      onClick={() => addOrRemoveSelectedTime(dayDate, time)}
                    >
                      {time}
                    </Button>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default WeekGrid2;
