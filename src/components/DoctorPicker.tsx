import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Doctor from '../types/DoctorType';

const DoctorPicker: React.FC = () => {
  const dispatch = useDispatch();
  const doctors = useSelector(
    (state: RootState) => state.DoctorReducer.doctors
  );

  useEffect(() => {
    fetch('/api/doctors')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setDoctors(data[0].doctors));
      });
  }, [dispatch]);

  const navigate = useNavigate();
  const handleButtonClick = (selectedDoctor: Doctor) => {
    // dispatch(setDoctors(selectedDoctor));
    navigate('/clinic-picker');
  };
  function DoctorImage({ pictureId }: { pictureId: number }) {
    const dispatch: AppDispatch = useDispatch();
    const doctorImage = useSelector(
      (state: RootState) => state.DoctorReducer.doctorImages[pictureId]
    );

    useEffect(() => {
      const loadImage = async () => {
        const imageModule = await import(
          `../../public/assets/doctorPics/${pictureId}.jpg`
        );
        dispatch(setDoctorImage({ id: pictureId, url: imageModule.default }));
      };

      loadImage();
    }, [dispatch, pictureId]);

    return <Image src={doctorImage} alt={`Doctor ${pictureId}`} w="100%" />;
  }

  const colorModeValue = useColorModeValue('#151f21', 'gray.900');
  const colorModeValue2 = useColorModeValue('white', 'gray.800');

  return (
    <Center py={6}>
      <Flex direction="row" overflowX="scroll" py={5}>
        {doctors.map((doctor: Doctor) => (
          <Box
            key={doctor.id}
            mx={2}
            maxW={'270px'}
            w={'full'}
            bg={colorModeValue2}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}
          >
            <Flex justify={'center'} mt={12}>
              <DoctorImage pictureId={doctor.pictureId} />
            </Flex>

            <Box p={6}>
              <Stack spacing={0} align={'center'} mb={5}>
                <Text fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                  {doctor.firstName} {doctor.lastName}
                </Text>
                <Text color={'gray.500'}>{doctor.title}</Text>
              </Stack>
              <Button
                w={'full'}
                mt={8}
                bg={colorModeValue}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                onClick={() => handleButtonClick(doctor)}
              >
                Zvolit {doctor.firstName}
              </Button>
            </Box>
          </Box>
        ))}
      </Flex>
    </Center>
  );
};

export default DoctorPicker;
