import { Box, Button, Grid, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import Clinic from '../types/ClinicType';
import Doctor from '../types/DoctorType';

const DoctorPicker: React.FC = () => {
  const { setDoctorAndClinic } = useAppContext();
  const navigate = useNavigate();

  const handleButtonClick = (selectedDoctor: Doctor) => {
    const dummyClinic: Clinic = {
      id: -1,
      name: 'temp Clinic',
      imageUrl: 'x',
    };
    setDoctorAndClinic(selectedDoctor, dummyClinic);
    navigate('/clinic-picker');
  };

  return (
    <Box maxW="container.xl" mx="auto" p={5}>
      <Text fontSize="3xl" color="teal.500" mb={3}>
        Zvolte si lékaře
      </Text>
      <Grid
        templateColumns={{ sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={6}
      >
        {doctors.map((doctor) => (
          <Box key={doctor.id}>
            <Image src={doctor.imageUrl} alt={doctor.name} w="100%" />
            <Text fontSize="lg" color="teal.500" mt={1}>
              {doctor.name}
            </Text>
            <Button
              colorScheme="teal"
              onClick={() => handleButtonClick(doctor)}
            >
              Zvolit {doctor.name}a
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default DoctorPicker;
