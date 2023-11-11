import { Center, Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useClinics } from '../hooks/useClinics'; // Assuming you have a similar hook for clinics
import ClinicCard from './ClinicCard';

const ClinicPicker: React.FC = () => {
  const { clinicList, selectedDoctor } = useAppContext();
  const { loading, error } = useClinics(); // Assuming you have a similar hook for clinics

  const getClinicsForSelectedDoctor = () => {
    if (selectedDoctor != null && clinicList != null) {
      return clinicList.filter((clinic) =>
        selectedDoctor.clinics.includes(clinic.id)
      );
    }
    return [];
  };

  const renderClinicCarousel = () => {
    if (!clinicList) {
      return null;
    }

    return getClinicsForSelectedDoctor()?.map((clinic) => (
      <ClinicCard key={clinic.id} clinic={clinic} />
    ));
  };

  return (
    <Center py={6}>
      <Flex direction="row" overflowX="scroll" py={5}>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          renderClinicCarousel()
        )}
      </Flex>
    </Center>
  );
};

export default ClinicPicker;
