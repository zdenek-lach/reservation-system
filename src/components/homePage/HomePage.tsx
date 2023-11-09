import { Box, Button, Container, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClinicPicture from '../../assets/clinic-picture.webp';
import { useAppContext } from '../AppContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setShowHeader } = useAppContext();

  const handleButtonClick = () => {
    navigate('/doctor-picker');
    setShowHeader(true);
  };

  return (
    <Box
      bgImage={ClinicPicture}
      bgSize="100% 100%"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <VStack>
        <Container maxW="container.lg">
          <Text fontSize="3xl" color="black" mb={3}>
            Vstoupit do rezervačního systému
          </Text>
          <Button colorScheme="teal" onClick={handleButtonClick}>
            Vstoupit
          </Button>
        </Container>
      </VStack>
    </Box>
  );
};

export default HomePage;
