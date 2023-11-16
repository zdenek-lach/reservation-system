import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Doctor from '../../types/DoctorType';

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const { selectedDoctor, setSelectedDoctor } = useAppContext();
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
              w="20%"
              borderRadius="xlarge"
              onLoad={() => setImageLoaded(true)}
              style={imageLoaded ? {} : { display: 'none' }}
            />
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack spacing={0} align={'center'} mb={3}>
            <Text
              fontSize={'xl'}
              fontWeight={500}
              fontFamily={'body'}
              color={'gray.800'}
            >
              {doctor.title} {doctor.firstName} {doctor.lastName}
            </Text>
            <Text color={'gray.500'}>{doctor.title}</Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default DoctorCard;
