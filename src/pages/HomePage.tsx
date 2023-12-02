import {
  Box,
  Button,
  Container,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react';
import ClinicPicture from 'assets/clinic-picture.webp';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorModeSwitcher } from 'utils/ColorModeSwitcher';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const handleButtonClick = () => {
    navigate('/appointment-page');
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
            Vstoupit
          </Button>
        </Container>
      </VStack>
    </Box>
  );
};

export default HomePage;
