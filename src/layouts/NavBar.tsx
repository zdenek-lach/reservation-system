import { Box, Button, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import packageJson from '../../package.json';

const NavBar: React.FC = () => {
  let location = useLocation();
  if (location.pathname.includes('splash-screen')) return null;
  return (
    <>
      <Flex
        id="navbar"
        minWidth="max-content"
        alignItems="center"
        gap="2"
        bg="red.600"
      >
        <Box p="2">
          <Heading size="md">
            <Text>Rezervační systém Artromedi</Text>
          </Heading>
        </Box>
        <Spacer />
        <Text color="white" fontWeight="hairline">
          verze {packageJson.version}
        </Text>
        <Button colorScheme="red.600" gap="2" p="1rem">
          Log In
        </Button>
      </Flex>
    </>
  );
};

export default NavBar;
