import { Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const ReservationManager: React.FC = () => {
  const [doctorsData, setDoctorsData] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('/api/doctors')
      .then((response) => response.json())
      .then((data) => setDoctorsData(data));
  }, []);

  return (
    <div>
      {doctorsData ? (
        <div>
          <h2>List of Doctors:</h2>
          {doctorsData[0].doctors.map((doctor: any, index: number) => (
            <div key={index}>
              <h3>Doctor {index + 1}</h3>
              <p>Doctor ID: {doctor.doctorId}</p>
              <p>
                Name: {doctor.firstName} {doctor.lastName}
              </p>
              <p>Clinics: {doctor.clinics.join(', ')}</p>
            </div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ReservationManager;
