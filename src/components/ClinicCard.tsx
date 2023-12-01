import {
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useAppContext } from 'context/AppContext';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Clinic from 'types/ClinicType';

const ClinicCard: React.FC<{ clinic: Clinic }> = ({ clinic }) => {
  const { setSelectedClinic } = useAppContext();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleButtonClick = () => {
    setSelectedClinic(clinic);
    navigate('/appointment-page');
  };

  return (
    <Box
      key={clinic.id}
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
          src={`/assets/clinicPics/${clinic.pictureId}.jpg`}
          alt={`Clinic ${clinic.pictureId}`}
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
            {clinic.name}
          </Text>
          <Text color={'gray.500'}>{clinic.location}</Text>
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
          onClick={handleButtonClick}
        >
          Zvolit {clinic.name}
        </Button>
      </Box>
    </Box>
  );
};

export default ClinicCard;
