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
import Clinic from '../types/ClinicType';

const ClinicCard: React.FC<{ clinic: Clinic }> = ({ clinic }) => {
  const { setSelectedClinic } = useAppContext();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleButtonClick = () => {
    setSelectedClinic(clinic);
    navigate('/doctor-picker');
  };

  return (
    <>
      <Card maxW="25%">
        <CardHeader>
          <Flex justify={'center'} mt={6}>
            {!imageLoaded && <Spinner />}
            <Image
              src={`/assets/clinicPics/${clinic.pictureId}.jpg`}
              alt={`Clinic ${clinic.pictureId}`}
              w="100%"
              borderRadius="lg"
              onLoad={() => setImageLoaded(true)}
              style={imageLoaded ? {} : { display: 'none' }}
              fallback={<Spinner />}
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
              {clinic.name}
            </Text>
            <Text color={'gray.500'}>{clinic.location}</Text>
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
            Zvolit {clinic.name}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ClinicCard;
