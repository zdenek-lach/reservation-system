import { useState } from 'react';
import { Button, Dropdown, Form, Modal, Table } from 'react-bootstrap';
import { useAppContext } from 'context/AppContext';
import { useReservations } from 'hooks/useReservations';
import Reservation from 'types/ReservationType';

// interface Reservation {
//   id: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
//   email: string;
//   date: string;
//   time: string;
//   doctor: string;
//   ambulance: string;
// }

const ReservationManagement = () => {
  const { reservationsList } = useAppContext();
  const reservations  = reservationsList;
  const { loadingReservations, errorReservations } = useReservations();

  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const handleShowModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
    setShowModal(false);
  };

  const handleDeleteReservation = (reservation: Reservation) => {
    // Add your logic to delete the reservation from the data source here
    console.log(`Deleting reservation ${reservation.id}`);
  };

  const handleAddReservation = () => {
    // Add your logic to add a new reservation to the data source here
    console.log('Adding a new reservation');
  };

  const handleEditReservation = (reservation: Reservation) => {
    // Add your logic to edit the reservation in the data source here
    console.log(`Editing reservation ${reservation.id}`);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex">
          <Dropdown className="mr-2">
            <Dropdown.Toggle variant="secondary" id="ambulance-dropdown">
              Ambulance
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Ambulance Orlová</Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                Ambulance Český Těšín
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Ambulance Ostrava</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mr-2">
            <Dropdown.Toggle variant="secondary" id="doctor-dropdown">
              Doktor
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">MUDr. Jan Novák</Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                MUDr. Ludmila Černohorská
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">MUDr. Petr Dvořák</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Form>
            <Form.Control type="date" className="mr-sm-2" />
            <Form.Control type="date" className="mr-sm-2" />
          </Form>
        </div>

        <Form>
          <Form.Control
            type="text"
            placeholder="Vyhledat"
            className="mr-sm-2"
          />
        </Form>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Číslo</th>
            <th>Jméno</th>
            <th>Příjmení</th>
            <th>Telefon</th>
            <th>E-mail</th>
            <th>Datum a čas</th>
            <th>Doktor</th>
            <th>Ambulance</th>
            <th>Akce</th>
          </tr>
        </thead>
        <tbody>
          {reservations != null && reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.client.firstName}</td>
              <td>{reservation.client.lastName}</td>
              <td>{reservation.client.phoneNumber}</td>
              <td>{reservation.client.email}</td>
              <td>
                {reservation.date} {reservation.time}
              </td>
              <td>{reservation.doctor.firstName} {reservation.doctor.lastName}</td>
              <td>{reservation.clinic.name}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="mr-1"
                  onClick={() => handleShowModal(reservation)}
                >
                  i
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="mr-1"
                  onClick={() => handleEditReservation(reservation)}
                >
                  ✏️
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteReservation(reservation)}
                >
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={handleAddReservation}>
        Přidat novou rezervaci
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
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
                <strong>Příjmení:</strong> {selectedReservation.client.lastName}
              </p>
              <p>
                <strong>Telefon:</strong> {selectedReservation.client.phoneNumber}
              </p>
              <p>
                <strong>E-mail:</strong> {selectedReservation.client.email}
              </p>
              <p>
                <strong>Datum a čas:</strong> {selectedReservation.date}{' '}
                {selectedReservation.time}
              </p>
              <p>
                <strong>Doktor:</strong> {selectedReservation.doctor.firstName} + {selectedReservation.doctor.lastName}
              </p>
              <p>
                <strong>Ambulance:</strong> {selectedReservation.clinic.location}
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
    </div>
  );
};

export default ReservationManagement;
