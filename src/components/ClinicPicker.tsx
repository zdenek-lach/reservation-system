import { Box, Button, Grid, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import Clinic from '../types/ClinicType';
import CeskyTesin from './../../assets/cesky_tesin.jpg';
import karvina from './../../assets/karvina.jpg';

const ClinicPicker: React.FC = () => {
  const { selectedDoctor, setDoctorAndClinic } = useAppContext();
  const navigate = useNavigate();

  const clinics: Clinic[] = [
    { id: 1, name: 'Kraviná', imageUrl: karvina },
    { id: 2, name: 'Cziesky Czieszyn', imageUrl: CeskyTesin },
  ];

  const handleButtonClick = (selectedClinic: Clinic) => {
    if (selectedDoctor !== null) {
      setDoctorAndClinic(selectedDoctor, selectedClinic);
      navigate('/calendar');
    } else {
      navigate('/error');
    }
  };

  return (
    <Box maxW="container.xl" mx="auto" p={5}>
      <Text fontSize="3xl" color="teal.500" mb={3}>
        Zvolte si kliniku
      </Text>
      <Grid templateColumns={{ sm: 'repeat(2, 1fr)' }} gap={6}>
        {clinics.map((clinic) => (
          <Box key={clinic.id}>
            <Image src={clinic.imageUrl} alt={clinic.name} w="100%" />
            <Text fontSize="lg" color="teal.500" mt={1}>
              {clinic.name}
            </Text>
            <Button
              colorScheme="teal"
              onClick={() => handleButtonClick(clinic)}
            >
              Zvolit {clinic.name}
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ClinicPicker;
