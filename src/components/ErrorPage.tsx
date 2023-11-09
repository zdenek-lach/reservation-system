import { Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage: React.FC = () => {
  return (
    <Center h="100vh" bgGradient="linear(to-l, black, red)">
      <VStack spacing={5} p={10} bg="white" boxShadow="xl" rounded="lg">
        <Box as={FaExclamationTriangle} size="64px" color="red.500" />
        <Text fontSize="4xl" fontWeight="bold" color="gray.700">
          Oops! Něco se pokazilo.
        </Text>
        <Text fontSize="lg" color="gray.500">
          Omlouváme se, zdá se, že se někde stala chyba.
        </Text>
        <Text fontSize="lg" color="gray.500">
          Prosím zkuste to znovu později něbo kontaktuje podporu.
        </Text>
        <Button colorScheme="red" onClick={() => window.location.reload()}>
          Obnovit stránku
        </Button>
      </VStack>
      Ł
    </Center>
  );
};

export default ErrorPage;
