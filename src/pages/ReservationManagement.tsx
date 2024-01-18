import { useState } from 'react';
import { Button, Dropdown, Form, Modal, Table } from 'react-bootstrap';

interface Reservation {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  doctor: string;
  ambulance: string;
}

const reservations: Reservation[] = [
  {
    id: '#0001',
    firstName: 'Petr',
    lastName: 'Kovář',
    phone: '+420 123 456 789',
    email: 'petrkovar@seznam.cz',
    date: '8.11.2023',
    time: '13:00',
    doctor: 'MUDr. Jan Novák',
    ambulance: 'Ambulance Orlová',
  },
];

const ReservationManagement = () => {
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
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.firstName}</td>
              <td>{reservation.lastName}</td>
              <td>{reservation.phone}</td>
              <td>{reservation.email}</td>
              <td>
                {reservation.date} {reservation.time}
              </td>
              <td>{reservation.doctor}</td>
              <td>{reservation.ambulance}</td>
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
                <strong>Jméno:</strong> {selectedReservation.firstName}
              </p>
              <p>
                <strong>Příjmení:</strong> {selectedReservation.lastName}
              </p>
              <p>
                <strong>Telefon:</strong> {selectedReservation.phone}
              </p>
              <p>
                <strong>E-mail:</strong> {selectedReservation.email}
              </p>
              <p>
                <strong>Datum a čas:</strong> {selectedReservation.date}{' '}
                {selectedReservation.time}
              </p>
              <p>
                <strong>Doktor:</strong> {selectedReservation.doctor}
              </p>
              <p>
                <strong>Ambulance:</strong> {selectedReservation.ambulance}
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
