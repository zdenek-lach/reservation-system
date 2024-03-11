import axios from 'axios';

import AddReservation from 'components/AddReservation';
import ClinicSelector from 'components/ClinicSelector';
import DoctorSelector from 'components/DoctorSelector';
import WeekPicker from 'components/WeekPicker';
import { useAppContext } from 'context/AppContext';
import { useClinics } from 'hooks/useClinics';
import { useDoctors } from 'hooks/useDoctors';
import { useReservations } from 'hooks/useReservations';
import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Dropdown,
  Form,
  Modal,
  Table,
} from 'react-bootstrap';
import {
  ArrowCounterclockwise,
  InfoCircle,
  Pencil,
  Trash3Fill,
} from 'react-bootstrap-icons';
import { authHeader } from 'security/AuthService';
import Clinic from 'types/ClinicType';
import Reservation from 'types/ReservationType';
import config from '../../config/config.json';
import Doctor from './../types/DoctorType';

const ReservationManagement = () => {
  const {
    reservationsList,
    setReservationsList,
    doctorList,
    clinicList,
    currentWeek,
    setCurrentWeek,
  } = useAppContext();
  const { loadingReservations, errorReservations } = useReservations();

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedDate, setEditedDate] = useState('');
  const [editedTime, setEditedTime] = useState('');
  const [editedNote, setEditedNote] = useState('');
  const [editedAmbulance, setEditedAmbulance] = useState<Clinic | null>(null);
  const [editedDoctor, setEditedDoctor] = useState<Doctor | null>(null);
  const [filterDoctor, setFilterDoctor] = useState<Doctor | null>(null);
  const [filterClinic, setFilterClinic] = useState<Clinic | null>(null);
  const [isWeekFilterEnabled, setIsWeekFilterEnabled] = useState(false);

  const { loadingDoctors, errorDoctors } = useDoctors();
  const { loadingClinics, errorClinics } = useClinics();

  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const handleShowInfoModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowInfoModal(true);
  };

  const handleShowEditModal = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setEditedFirstName(reservation.client.firstName);
    setEditedLastName(reservation.client.lastName);
    setEditedPhoneNumber(reservation.client.phoneNumber);
    setEditedEmail(reservation.client.email);
    setEditedDate(reservation.date);
    setEditedTime(reservation.time);
    setEditedNote(reservation.note);
    setEditedAmbulance(reservation.clinic);
    setEditedDoctor(reservation.doctor);

    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
    setShowInfoModal(false);
    setShowEditModal(false);
  };

  const handleDeleteReservation = (reservation: Reservation) => {
    const deleteUrl = config.api.reservationsApi.delete + `/${reservation.id}`;

    axios
      .delete(deleteUrl, {
        headers: {
          ...authHeader(),
        },
      })
      .then((response) => {
        console.log(`Successfully deleted reservation ${reservation.id}`);
        console.log(response.status);

        if (reservationsList) {
          const updatedReservations = reservationsList.filter(
            (res) => res.id !== reservation.id
          );
          setReservationsList(updatedReservations);
        }
      })
      .catch((error) => {
        console.error(`Error deleting reservation ${reservation.id}:`, error);
      });
  };

  const handleEditFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedFirstName(event.target.value);
  };

  const handleEditLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedLastName(event.target.value);
  };

  const handleEditPhoneNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedPhoneNumber(event.target.value);
  };

  const handleEditEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedEmail(event.target.value);
  };

  const handleEditDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDate(event.target.value);
  };
  const handleEditTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTime(event.target.value);
  };
  const handleEditNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNote(event.target.value);
  };

  const handleSaveChanges = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (selectedReservation) {
      const editUrl =
        config.api.reservationsApi.edit + `/${selectedReservation.id}`;

      const updatedReservation = {
        id: selectedReservation.id,
        client: {
          id: selectedReservation.client.id,
          firstName: editedFirstName,
          lastName: editedLastName,
          email: editedEmail,
          phoneNumber: editedPhoneNumber,
        },
        date: editedDate,
        time: editedTime,
        clinic: {
          id: editedAmbulance?.id,
          ...editedAmbulance,
        },
        doctor: {
          id: editedDoctor?.id,
          ...editedDoctor,
        },
        note: editedNote,
      };

      axios
        .put(editUrl, updatedReservation, {
          headers: {
            ...authHeader(),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(
            `Successfully updated reservation ${selectedReservation.id}`
          );
          if (reservationsList) {
            const updatedReservations = reservationsList.map((res) =>
              res.id === selectedReservation.id ? updatedReservation : res
            );

            setReservationsList(updatedReservations); //fixme it works, but shows error.. idk how to fix this.. just typescript things :)
          }
          handleCloseModal();
          console.log(response.status);
        })
        .catch((error) => {
          console.error(
            `Error updating reservation ${selectedReservation.id}:`,
            error
          );
        });

      console.error(
        'data sent: ' +
          Object.entries(updatedReservation).forEach((key) =>
            console.error(key)
          )
      );

      handleCloseModal();
    }
  };

  const startOfWeek = (date: Date) => {
    const result = new Date(date);
    result.setDate(result.getDate() - result.getDay() + 1);
    return result;
  };

  const endOfWeek = (date: Date) => {
    const result = new Date(date);
    result.setDate(result.getDate() - result.getDay() + 7);
    return result;
  };

  useEffect(() => {
    reservationsList;
  });

  return (
    <Container
      style={{
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        padding: '20px',
        borderRadius: '15px',
        marginTop: '20px',
        marginLeft: '20px',
      }}
    >
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Vyhledat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <DoctorSelector
          selectedDoctor={filterDoctor}
          setSelectedDoctor={setFilterDoctor}
        />
        <ClinicSelector
          selectedClinic={filterClinic}
          setSelectedClinic={setFilterClinic}
        />
        <Button
          variant="danger"
          onClick={() => {
            setSearchTerm('');
            setFilterDoctor(null);
            setFilterClinic(null);
          }}
        >
          <ArrowCounterclockwise />
        </Button>
        <Form.Check
          type="checkbox"
          label="Filtrovat dle týdnu"
          checked={isWeekFilterEnabled}
          onChange={(e) => setIsWeekFilterEnabled(e.target.checked)}
        />
        {isWeekFilterEnabled && (
          <WeekPicker
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
          />
        )}
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Číslo</th>
            <th>Jméno</th>
            <th>Příjmení</th>
            <th>Datum a čas</th>
            <th>Doktor</th>
            <th>Ambulance</th>
          </tr>
        </thead>
        <tbody
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '15px',
            marginTop: '20px',
            marginLeft: '20px',
          }}
        >
          {reservationsList != null &&
            reservationsList
              .filter(
                (reservation) =>
                  reservation.client.phoneNumber.includes(searchTerm) ||
                  reservation.client.firstName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  reservation.client.lastName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  reservation.client.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  reservation.note
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .filter(
                (reservation) =>
                  filterDoctor == null ||
                  reservation.doctor.id === filterDoctor.id
              )
              .filter(
                (reservation) =>
                  filterClinic == null ||
                  reservation.clinic.id === filterClinic.id
              )
              .filter(
                (reservation) =>
                  !isWeekFilterEnabled ||
                  (new Date(reservation.date) >= startOfWeek(currentWeek) &&
                    new Date(reservation.date) <= endOfWeek(currentWeek))
              )

              .map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.client.firstName}</td>
                  <td>{reservation.client.lastName}</td>
                  <td>
                    {reservation.date} {reservation.time}
                  </td>
                  <td>
                    {reservation.doctor.firstName} {reservation.doctor.lastName}
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
                    <Button
                      variant="warning"
                      size="lg"
                      className="mr-1"
                      onClick={() => handleShowEditModal(reservation)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="danger"
                      size="lg"
                      onClick={() => handleDeleteReservation(reservation)}
                    >
                      <Trash3Fill />
                    </Button>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      <AddReservation />
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
                <strong>Příjmení:</strong> {selectedReservation.client.lastName}
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
                <strong>Doktor:</strong> {selectedReservation.doctor.firstName}+{' '}
                {selectedReservation.doctor.lastName}
              </p>
              <p>
                <strong>Ambulance:</strong>
                {selectedReservation.clinic.name}
              </p>
              <p>
                <strong>Poznámka:</strong>
                {selectedReservation.note}
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
      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editace rezervace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            Jméno:
            <input
              type="text"
              value={editedFirstName}
              onChange={handleEditFirstName}
            />
          </label>
          <label>
            Příjmení:
            <input
              type="text"
              value={editedLastName}
              onChange={handleEditLastName}
            />
          </label>
          <label>
            Telefon:
            <input
              type="text"
              value={editedPhoneNumber}
              onChange={handleEditPhoneNumber}
            />
          </label>
          <label>
            E-mail:
            <input type="text" value={editedEmail} onChange={handleEditEmail} />
          </label>
          <label>
            Datum:
            <input type="text" value={editedDate} onChange={handleEditDate} />
          </label>
          <label>
            Čas:
            <input type="text" value={editedTime} onChange={handleEditTime} />
          </label>
          <label>
            Poznámka:
            <input type="text" value={editedNote} onChange={handleEditNote} />
          </label>
          <label>
            Doktor:
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {editedDoctor != null
                  ? `${editedDoctor.title} ${editedDoctor.firstName} ${editedDoctor.lastName}`
                  : 'Vyberte Doktora'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {doctorList &&
                  doctorList.map((doctor) => (
                    <Dropdown.Item
                      key={doctor.id}
                      onClick={() => setEditedDoctor(doctor)}
                    >
                      {`${doctor.title} ${doctor.firstName} ${doctor.lastName}`}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </label>
          <br />
          <label>
            Klinika:
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {editedAmbulance != null
                  ? `${editedAmbulance.name} ${editedAmbulance.location}`
                  : 'Vyberte Kliniku'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {clinicList &&
                  clinicList.map((clinic) => (
                    <Dropdown.Item
                      key={clinic.id}
                      onClick={() => setEditedAmbulance(clinic)}
                    >
                      {`${clinic.name} ${clinic.location}`}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Zavřít
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Uložit upravenou rezervaci
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ReservationManagement;
