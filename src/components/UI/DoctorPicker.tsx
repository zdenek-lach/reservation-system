import { Box, Button, Grid, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

import jackie from './../../assets/H.jpg';
import marko from './../../assets/M.jpg';
import sid from './../../assets/Z.jpg';

// Define a type for a doctor
type Doctor = {
  id: number;
  name: string;
  imageUrl: string;
};
type Clinic = {
  id: number;
  name: string;
  imageUrl: string;
};

const DoctorPicker: React.FC = () => {
  const { setDoctorAndClinic } = useAppContext();
  const navigate = useNavigate();

  const doctors: Doctor[] = [
    { id: 1, name: 'MuDr. Jackie', imageUrl: jackie },
    { id: 2, name: 'JuDr. Pepega', imageUrl: marko },
    { id: 3, name: 'KekDr. Sid', imageUrl: sid },
  ];

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
