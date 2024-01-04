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
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useAppContext } from 'context/AppContext';
import React, { useState } from 'react';
import Clinic from 'types/ClinicType';
import Doctor from 'types/DoctorType';

interface TimeBlockProps {
  time: string;
  date: Date;
}

interface FormData {
  date: string;
  time: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  comment: string;
  doctor: Doctor; // New field for selected doctor
  clinic: Clinic; // New field for selected clinic
}

const TimeBlock: React.FC<TimeBlockProps> = ({ time, date }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSummaryOpen,
    onOpen: onSummaryOpen,
    onClose: onSummaryClose,
  } = useDisclosure();
  const [formData, setFormData] = useState<FormData | null>(null);

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
    const data: FormData = {
      date: date.toLocaleDateString('cs-CZ'),
      time: time,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      comment: comment,
      doctor: selectedDoctor, // Include selected doctor in form data
      clinic: selectedClinic, // Include selected clinic in form data
    };
    setFormData(data); // Update the formData state
    onClose(); // Close the first modal
    onSummaryOpen(); // Open the summary modal
  };

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

      {/* New modal to display the form data */}
      <Modal isOpen={isSummaryOpen} onClose={onSummaryClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {formData && (
              <>
                <Text>Vybrané datum: {formData.date}</Text>
                <Text>Vybraný čas: {formData.time}</Text>
                <Text>Jméno: {formData.firstName}</Text>
                <Text>Příjmení: {formData.lastName}</Text>
                <Text>Telefon: {formData.phone}</Text>
                <Text>Email: {formData.email}</Text>
                <Text>Komentář: {formData.comment}</Text>
                <Text>
                  Vybraný lékař: {formData.doctor.title}.
                  {formData.doctor.firstName}
                  {formData.doctor.lastName}
                </Text>
                <Text>
                  Vybraná klinika: {formData.clinic.name},
                  {formData.clinic.location}
                </Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TimeBlock;
