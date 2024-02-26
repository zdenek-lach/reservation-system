import { useAppContext } from 'context/AppContext';
import { useClinics } from 'hooks/useClinics';
import { useDoctors } from 'hooks/useDoctors';
import { useReservations } from 'hooks/useReservations';
import { useState } from 'react';
import {
  Button,
  Container,
  Dropdown,
  Form,
  Modal,
  Table,
} from 'react-bootstrap';
import { InfoCircle, Pencil, Trash3Fill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import Reservation from 'types/ReservationType';
import Doctor from './../types/DoctorType';
import DoctorFaker from 'components/DoctorFaker';

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const StyledForm = styled(Form)`
  margin-bottom: 20px;
`;

const MyReservations = () => {
  const { reservationsList, doctorList, clinicList } = useAppContext();
  const { loadingReservations, errorReservations } = useReservations();

  const [showInfoModal, setShowInfoModal] = useState(false);

  const { loadingDoctors, errorDoctors } = useDoctors();
  const { loadingClinics, errorClinics } = useClinics();

  const [loggedUser, setLoggedUser] = useState<Doctor | null>(null);

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const handleShowInfoModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowInfoModal(true);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
    setShowInfoModal(false);
  };

  return (
    <StyledContainer>
      <DoctorFaker loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Číslo</th>
              <th>Příjmení</th>
              <th>Datum a čas</th>
              <th>Doktor</th>
              <th>Ambulance</th>
            </tr>
          </thead>
          <tbody>
            {reservationsList != null &&
              reservationsList
                .filter(
                  (reservation) =>
                    loggedUser == null ||
                    `${reservation.doctor.title} ${reservation.doctor.firstName} ${reservation.doctor.lastName}` ===
                      `${loggedUser.title} ${loggedUser.firstName} ${loggedUser.lastName}`
                )
                .map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{reservation.client.lastName}</td>
                    <td>
                      {reservation.date} {reservation.time}
                    </td>
                    <td>
                      {reservation.doctor.firstName}{' '}
                      {reservation.doctor.lastName}
                    </td>
                    <td>{reservation.clinic.name}</td>
                    <td>
                      <Button
                        variant="info"
                        size="lg"
                        className="mr-1"
                        onClick={() => handleShowInfoModal(reservation)}
                      >
                        <InfoCircle />
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>

        <Modal show={showInfoModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Informace o rezervaci</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedReservation && (
              <div>
                <p>
                  <strong>Číslo:</strong> {selectedReservation.id}
                </p>
                <p>
                  <strong>Jméno:</strong> {selectedReservation.client.firstName}
                </p>
                <p>
                  <strong>Příjmení:</strong>{' '}
                  {selectedReservation.client.lastName}
                </p>
                <p>
                  <strong>Telefon:</strong>
                  {selectedReservation.client.phoneNumber}
                </p>
                <p>
                  <strong>E-mail:</strong> {selectedReservation.client.email}
                </p>
                <p>
                  <strong>Datum a čas:</strong> {selectedReservation.date}
                  {selectedReservation.time}
                </p>
                <p>
                  <strong>Doktor:</strong>{' '}
                  {selectedReservation.doctor.firstName}+{' '}
                  {selectedReservation.doctor.lastName}
                </p>
                <p>
                  <strong>Ambulance:</strong>
                  {selectedReservation.clinic.name}
                </p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Zavřít
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </StyledContainer>
  );
};

export default MyReservations;
