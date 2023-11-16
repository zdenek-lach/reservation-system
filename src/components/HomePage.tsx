import { Box, Button, Container, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClinicPicture from '../assets/clinic-picture.webp';
import { ColorModeSwitcher } from '../utils/ColorModeSwitcher';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/doctor-picker');
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
          <Text>Choose your side: </Text>
          <ColorModeSwitcher />
          <Button colorScheme="teal" onClick={handleButtonClick}>
            haha
          </Button>
        </Container>
      </VStack>
    </Box>
  );
};

export default HomePage;
