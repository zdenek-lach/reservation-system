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
import { useAppContext } from 'context/AppContext';
import React, { useState } from 'react';
import ReservationData from 'types/ReservationData';

interface ReservationFormProps {
  time: string;
  date: Date;
  onFormSubmit: (data: ReservationData) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  time,
  date,
  onFormSubmit,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // States for form inputs
  const [firstName, setFirstname] = useState('');
  const [lastName, setlastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  // Get selected doctor and clinic from context
  const { selectedDoctor, selectedClinic } = useAppContext();

  const handleFormSubmit = () => {
    // Collect the form data
    const data: ReservationData = {
      date: date.toLocaleDateString('cs-CZ'),
      time: time,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      comment: comment,
      doctor: selectedDoctor,
      clinic: selectedClinic,
    };
    onFormSubmit(data); // Pass the data up to the parent component
    onClose(); // Close the modal
  };

  return (
    <>
      <Button
        colorScheme="red"
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
            <FormControl id="selectedDate">
              <FormLabel>
                Vybrané datum: {date.toLocaleDateString('cs-CZ')}
              </FormLabel>
              <FormLabel>Vybraný čas: {time}</FormLabel>
            </FormControl>
            <FormControl id="firstName">
              <FormLabel>Jméno</FormLabel>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Příjmení</FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Telefon</FormLabel>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="comment">
              <FormLabel>Komentář (dobrovolné)</FormLabel>
              <Input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleFormSubmit}>
              Odeslat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReservationForm;
