import { eachHourOfInterval, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';

interface TimeSlot {
  day: Date;
  time: string;
}

interface WeekGrid2Props {
  startOfWeek: Date;
  setClickedButtons: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
  initialShifts?: TimeSlot[];
  readOnly?: boolean;
}

const startHour = 7;
const endHour = 19;
const timeSlots = eachHourOfInterval({
  start: new Date(0, 0, 0, startHour),
  end: new Date(0, 0, 0, endHour),
}).map((time) => format(time, 'HH:mm'));

const WeekGrid2: React.FC<WeekGrid2Props> = ({
  startOfWeek,
  setClickedButtons,
  initialShifts = [],
  readOnly = false,
}) => {
  const days = ['Po', 'Út', 'St', 'Čt', 'Pá'];

  const initialButtonStates = initialShifts.reduce((acc, slot) => {
    const buttonKey = `${slot.day.getTime()}-${slot.time}`;
    acc[buttonKey] = true;
    return acc;
  }, {});

  const [buttonStates, setButtonStates] = useState(initialButtonStates);
  const [selectedTimes, setSelectedTimes] = useState(initialShifts);

  const toggleSelectedTime = (dayDate: Date, time: string) => {
    const buttonKey = `${dayDate.getTime()}-${time}`;
    const isSelected = buttonStates[buttonKey];

    setButtonStates((prev) => ({ ...prev, [buttonKey]: !isSelected }));

    setSelectedTimes((prev) =>
      isSelected
        ? prev.filter(
            (slot) =>
              slot.day.getTime() !== dayDate.getTime() || slot.time !== time
          )
        : [...prev, { day: dayDate, time }]
    );
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
            startOfWeek.getDate() + index
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
                  <td key={buttonKey} className="p-2">
                    <Button
                      style={{ borderRadius: '20px' }}
                      variant={isSelected ? 'primary' : 'secondary'}
                      onClick={() =>
                        !readOnly && toggleSelectedTime(dayDate, time)
                      }
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
