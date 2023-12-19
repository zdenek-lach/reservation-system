import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';

interface TimeBlockProps {
  time: string;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ time }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="blue"
        size="md"
        borderRadius="9999px"
        onClick={onOpen}
      >
        {time}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rezervace</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name">
              <FormLabel>Jméno</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="surname">
              <FormLabel>Příjmení</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Telefon</FormLabel>
              <Input type="tel" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="comment">
              <FormLabel>Komentář</FormLabel>
              <Input type="text" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Odeslat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TimeBlock;
