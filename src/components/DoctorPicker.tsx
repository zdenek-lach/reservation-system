import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useDoctors } from '../hooks/useDoctors';
import Doctor from '../types/DoctorType';

const DoctorPicker: React.FC = () => {
  const { doctorList, setSelectedDoctor } = useAppContext();
  const { loading, error } = useDoctors();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleButtonClick = (selectedDoctor: Doctor) => {
    setSelectedDoctor(selectedDoctor);
    navigate('/clinic-picker');
  };

  const renderDoctorCarousel = () => {
    if (!doctorList) {
      return null;
    }

    return doctorList?.map((doctor: Doctor) => {
      return (
        <Box
          key={doctor.id}
          mx={2}
          maxW={'270px'}
          w={'full'}
          bg={'white'}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}
        >
          <Flex justify={'center'} mt={12}>
            <Image
              src={`/assets/doctorPics/${doctor.pictureId}.jpg`}
              alt={`Doctor ${doctor.pictureId}`}
              w="100%"
              onLoad={() => setImageLoaded(true)}
              fallback={<Spinner />}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Text
                fontSize={'2xl'}
                fontWeight={500}
                fontFamily={'body'}
                color={'gray.800'}
              >
                {doctor.firstName} {doctor.lastName}
              </Text>
              <Text color={'gray.500'}>{doctor.title}</Text>
            </Stack>
            <Button
              w={'full'}
              mt={8}
              bg={'blue.500'}
              color={'white'}
              rounded={'md'}
              _hover={{
                bg: 'blue.600',
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={() => handleButtonClick(doctor)}
            >
              Zvolit {doctor.firstName}
            </Button>
          </Box>
        </Box>
      );
    });
  };

  return (
    <Center py={6}>
      <Flex direction="row" overflowX="scroll" py={5}>
        {loading ? (
          <Spinner />
        ) : error ? (
          <Text>{error}</Text>
        ) : (
          renderDoctorCarousel()
        )}
      </Flex>
    </Center>
  );
};

export default DoctorPicker;
