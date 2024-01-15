import React, { useState } from 'react';
import ReservationForm from './ReservationForm';
import ReservationSummary from './ReservationSummary';

import ReservationData from 'types/ReservationData';

interface TimeBlockProps {
  time: string;
  date: Date;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ time, date }) => {
  const [ReservationData, setReservationData] =
    useState<ReservationData | null>(null);

  return (
    <>
      <ReservationForm
        time={time}
        date={date}
        onFormSubmit={(data) => setReservationData(data)}
      />
      {ReservationData != null && (
        <ReservationSummary ReservationData={ReservationData} />
      )}
    </>
  );
};

export default TimeBlock;
