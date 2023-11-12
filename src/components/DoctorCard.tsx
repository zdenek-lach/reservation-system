import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Doctor from '../types/DoctorType';

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const { setSelectedDoctor } = useAppContext();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleButtonClick = () => {
    setSelectedDoctor(doctor);
    navigate('/clinic-picker');
  };

  return (
    <>
      <Card maxW="25%">
        <CardHeader>
          <Flex justify={'center'} mt={6}>
            {!imageLoaded && <Spinner />}
            <Image
              src={`/assets/doctorPics/${doctor.pictureId}.jpg`}
              alt={`Doctor ${doctor.firstName + doctor.lastName}`}
              w="100%"
              borderRadius="lg"
              onLoad={() => setImageLoaded(true)}
              style={imageLoaded ? {} : { display: 'none' }}
            />
          </Flex>
        </CardHeader>
        <CardBody>
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
        </CardBody>
        <CardFooter>
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
            onClick={handleButtonClick}
          >
            Zvolit {doctor.firstName}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default DoctorCard;
