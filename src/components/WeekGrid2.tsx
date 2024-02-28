import { eachHourOfInterval, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';

interface WeekGrid2Props {
  startOfWeek: Date;
  setClickedButtons: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
  initialShifts?: TimeSlot[];
}

const startHour = 7;
const endHour = 19;
const timeSlots = eachHourOfInterval({
  start: new Date(0, 0, 0, startHour),
  end: new Date(0, 0, 0, endHour),
}).map((time) => format(time, 'HH:mm'));

export interface TimeSlot {
  day: Date;
  time: string;
}

const WeekGrid2: React.FC<WeekGrid2Props> = ({
  startOfWeek,
  setClickedButtons,
  initialShifts,
}) => {
  const days = ['Po', 'Út', 'St', 'Čt', 'Pá'];

  const [buttonStates, setButtonStates] = useState(() => {
    let initialButtonStates = {};
    initialShifts?.forEach((slot) => {
      // Use optional chaining here
      const buttonKey = `${slot.day.getTime()}-${slot.time}`;
      initialButtonStates[buttonKey] = true;
    });
    return initialButtonStates;
  });
  const [selectedTimes, setSelectedTimes] = useState(initialShifts || []);

  const addOrRemoveSelectedTime = (dayDate: Date, time: string) => {
    const buttonKey = `${dayDate.getTime()}-${time}`;
    const isSelected = buttonStates[buttonKey];

    let newButtonStates = { ...buttonStates };
    let newSelectedTimes = [...selectedTimes];

    if (isSelected) {
      newButtonStates[buttonKey] = false;
      newSelectedTimes = newSelectedTimes.filter(
        (slot) => slot.day.getTime() !== dayDate.getTime() || slot.time !== time
      );
    } else {
      newButtonStates[buttonKey] = true;
      newSelectedTimes.push({ day: dayDate, time });
    }

    setButtonStates(newButtonStates);
    setSelectedTimes(newSelectedTimes);
  };

  useEffect(() => {
    setClickedButtons(selectedTimes);
  }, [selectedTimes, setClickedButtons]);

  return (
    <Table striped size="md">
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
                const buttonKey = `${dayDate.getTime()}-${time}`;
                const isSelected = buttonStates[buttonKey];

                return (
                  <td key={buttonKey} className="p-3">
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
