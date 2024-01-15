import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import ReservationData from 'types/ReservationData';

interface ReservationSummaryProps {
  ReservationData: ReservationData;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  ReservationData,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Summary</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {ReservationData && (
              <>
                <Text>Vybrané datum: {ReservationData.date}</Text>
                <Text>Vybraný čas: {ReservationData.time}</Text>
                <Text>Jméno: {ReservationData.firstName}</Text>
                <Text>Příjmení: {ReservationData.lastName}</Text>
                <Text>Telefon: {ReservationData.phone}</Text>
                <Text>Email: {ReservationData.email}</Text>
                <Text>Komentář: {ReservationData.comment}</Text>
                <Text>
                  Vybraný lékař: {ReservationData.doctor.title}
                  {ReservationData.doctor.firstName}
                  {ReservationData.doctor.lastName}
                </Text>
                <Text>
                  Vybraná klinika: {ReservationData.clinic.name},
                  {ReservationData.clinic.location}
                </Text>
                <Button
                  colorScheme="pink"
                  onClick={() => {
                    alert(
                      'Rezervaci jsem poslal Markovi, snad to dobře dopadne, pokud jo, přijde ti mail a' +
                        ReservationData.date +
                        ' naklusej v ' +
                        ReservationData.time +
                        'do ordinace'
                    );
                  }}
                >
                  Odeslat
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReservationSummary;
