import React, { useState, useCallback } from 'react';
import ReservationForm from './ReservationForm';
import ReservationData from 'types/ReservationData';
import ReservationSummary from './ReservationSummary';

interface TimeBlockProps {
  time: string;
  date: Date;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ time, date }) => {
  const [ReservationData, setReservationData] =
    useState<ReservationData | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const onShowSummary = useCallback( () =>
  {
    setShowSummary(true);
  }, [showSummary]);

  return (
    <>
      <ReservationForm
        time={time}
        date={date}
        onFormSubmit={(data) => setReservationData(data)}
        onShowSummary={onShowSummary}
      />
      {(
        <ReservationSummary ReservationData={ReservationData} ShowSummary={showSummary} SetSummary={setShowSummary}/>
      )}
    </>
  );
};

export default TimeBlock;
