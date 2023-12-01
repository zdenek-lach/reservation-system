import { Center, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

import { useAppContext } from 'context/AppContext';
import { useDoctors } from 'hooks/useDoctors';
import ErrorPage from 'pages/ErrorPage';
import DoctorCard from '../components/DoctorCard';

const DoctorPicker: React.FC = () => {
  const { doctorList } = useAppContext();
  const { loading, error } = useDoctors();

  const renderDoctorCarousel = () => {
    if (!Array.isArray(doctorList) || doctorList == null) {
      return <ErrorPage errorMessage="DoctorList is empty" />;
    }

    return (
      <>
        {doctorList?.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </>
    );
  };

  return (
    <Center py={6}>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        renderDoctorCarousel()
      )}
    </Center>
  );
};

export default DoctorPicker;
