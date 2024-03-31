import { eachHourOfInterval, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Badge, Button, Table } from 'react-bootstrap';

interface WeekGrid2Props {
  startOfWeek: Date;
  setClickedButtons: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
  initialShifts?: TimeSlot[];
  readOnly?: boolean;
  isPresetMode?: boolean;
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
  readOnly = false,
  isPresetMode = false,
}) => {
  const days = ['Po', 'Út', 'St', 'Čt', 'Pá'];

  const getInitialShifts = () => {
    let initialButtonStates: string[] = [];
    initialShifts?.forEach((slot) => {
      const buttonKey = `${slot.day.getFullYear()}-${slot.day.getMonth()}-${slot.day.getDate()}-${
        slot.time
      }`;
      initialButtonStates.push(buttonKey);
    });
    return initialButtonStates;
  };

  const [buttonStates, setButtonStates] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const getSelectedTimes = () => {
    let times: TimeSlot[] = [];
    initialShifts?.forEach((slot) => {
      times.push({ day: slot.day, time: slot.time });
    });
    return times;
  };

  useEffect(() => {
    if (initialShifts) {
      const shifts = getInitialShifts();
      const times = getSelectedTimes();
      setButtonStates(shifts);
      setSelectedTimes(times);
    }
  }, [initialShifts]);

  const getIsSelected = (buttonStates: string[], buttonKey: string) => {
    for (const state of buttonStates) {
      if (state == buttonKey) {
        return true;
      }
    }
    return false;
  };

  const addOrRemoveSelectedTime = (dayDate: Date, time: string) => {
    const buttonKey = `${dayDate.getFullYear()}-${dayDate.getMonth()}-${dayDate.getDate()}-${time}`;
    const isSelected = getIsSelected(buttonStates, buttonKey);

    let newButtonStates = [...buttonStates];
    let newSelectedTimes = [...selectedTimes];

    if (isSelected) {
      newButtonStates = newButtonStates.filter((state) => {
        return state != buttonKey;
      });
      newSelectedTimes = newSelectedTimes.filter((slot) => {
        const date1 = `${slot.day.getFullYear()}-${slot.day.getMonth()}-${slot.day.getDate()}-${
          slot.time
        }`;
        const date2 = `${dayDate.getFullYear()}-${dayDate.getMonth()}-${dayDate.getDate()}-${time}`;
        return date1 != date2;
      });
    } else {
      newButtonStates.push(buttonKey);
      newSelectedTimes.push({ day: dayDate, time });
    }

    setButtonStates(newButtonStates);
    setSelectedTimes(newSelectedTimes);
  };

  useEffect(() => {
    setClickedButtons(selectedTimes);
  }, [selectedTimes, setClickedButtons]);
  return (
    <Table striped size='md'>
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
            <tr key={day} className='bg-light text-dark'>
              <td>
                {day}
                {!isPresetMode && (
                  <Badge className=''>
                    {dayDate.toLocaleDateString('cs-CZ')}
                  </Badge>
                )}
              </td>
              {timeSlots.map((time) => {
                const buttonKey = `${dayDate.getFullYear()}-${dayDate.getMonth()}-${dayDate.getDate()}-${time}`;
                const isSelected = getIsSelected(buttonStates, buttonKey);

                return (
                  <td key={buttonKey} className='p-2'>
                    <Button
                      style={{
                        borderRadius: '20px',
                      }}
                      variant={isSelected ? 'primary' : 'secondary'}
                      onClick={() =>
                        !readOnly && addOrRemoveSelectedTime(dayDate, time)
                      }
                    >
                      {time}
                      {!isPresetMode && ' - ' + dayDate.toLocaleDateString()}
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
