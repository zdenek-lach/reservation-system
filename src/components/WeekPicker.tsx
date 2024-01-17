import React from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { CaretLeftFill, CaretRightFill } from 'react-bootstrap-icons';

// Updated the interface to include currentWeek and setCurrentWeek
interface WeekPickerProps {
  currentWeek: Date;
  setCurrentWeek: (date: Date) => void;
}

const WeekPicker: React.FC<WeekPickerProps> = ({
  currentWeek,
  setCurrentWeek,
}) => {
  const getFormattedDate = (date: Date): string => {
    return date.toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handlePrevWeek = () => {
    // Used getTime() to avoid mutating the original date
    const prevWeek = new Date(currentWeek.getTime());
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const handleNextWeek = () => {
    // Used getTime() to avoid mutating the original date
    const nextWeek = new Date(currentWeek.getTime());
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  // Calculate the start of the week (Monday)
  const startOfWeek = new Date(currentWeek.getTime());
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

  // Calculate the end of the week (Friday)
  const endOfWeek = new Date(startOfWeek.getTime());
  endOfWeek.setDate(endOfWeek.getDate() + 4);

  return (
    <Card
      className="text-center"
      style={{
        width: '350px',
        margin: '20px',
        borderRadius: '8px',
        backgroundColor: '#EDF2F7',
        padding: '10px',
      }}
    >
      <ButtonGroup
        className="d-flex align-items-center"
        aria-label="Week navigation"
      >
        <Button variant="" onClick={handlePrevWeek}>
          <CaretLeftFill />
        </Button>
        <Card.Text style={{ margin: '10px', fontWeight: 'bold' }}>
          {getFormattedDate(startOfWeek)} - {getFormattedDate(endOfWeek)}
        </Card.Text>
        <Button
          style={{
            alignContent: 'right',
          }}
          variant=""
          onClick={handleNextWeek}
        >
          <CaretRightFill /> 
          {/* TODO is missaligned */}
        </Button>
      </ButtonGroup>
    </Card>
  );
};

export default WeekPicker;
