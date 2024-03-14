import axios from 'axios';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { authHeader } from 'security/AuthService';
import Clinic from 'types/ClinicType';
import Doctor from 'types/DoctorType';
import ReservationData from 'types/ReservationData';
import ReservationDto from 'types/ReservationDtoType';
import config from '../../config/config.json';
import ClinicSelector from './ClinicSelector';
import DoctorSelector from './DoctorSelector';
import { useAppContext } from 'context/AppContext';
import {
  Pencil,
} from 'react-bootstrap-icons';
import Reservation from 'types/ReservationType';

interface EditReservationProps{
  Reservation: Reservation;
  ReservationList: Reservation[];
  SetReservationList: Dispatch<SetStateAction<Reservation[]>>;
}
const EditReservation: React.FC<EditReservationProps> = ({Reservation, ReservationList, SetReservationList}) => {
  const [showModal, setShowModal] = useState(false);
  const [newReservationData, setNewReservationData] = useState({
    firstName: Reservation.client.firstName,
    lastName: Reservation.client.lastName,
    phone: Reservation.client.phoneNumber,
    email: Reservation.client.email,
    comment: Reservation.note,
  });
  const [validationError, setValidationError] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(Reservation.date));
  const [selectedTime, setSelectedTime] = useState(Reservation.time);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(Reservation.doctor);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(Reservation.clinic);
  const { setShowMessageToast } = useAppContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Hello Jackie")
    setNewReservationData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e: { target: { value: string } }) => {
    setSelectedTime(`${e.target.value}`);
  };

  const updateReservationList = (newReservation:Reservation) => {
    let changedItem = ReservationList.find( (item) => item.id === newReservation.id)
    if(changedItem)
    {
      ReservationList[ReservationList.indexOf(changedItem)] = newReservation
      SetReservationList(ReservationList)
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const updatedReservation = {
        id: Reservation.id,
        client: {
          id: Reservation.client.id,
          firstName: newReservationData.firstName,
          lastName: newReservationData.lastName,
          email: newReservationData.email,
          phoneNumber: newReservationData.phone,
        },
        date: Reservation.date,
        time: Reservation.time,
        clinic: {
          ...(selectedClinic),
        },
        doctor: {
          ...(selectedDoctor),
        },
        note: Reservation.note,
      };

        const response = await axios.put(
          config.api.reservationsApi.edit + `/${Reservation.id}`,
          updatedReservation,
          {
            headers: {
              ...authHeader(),
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          // OK, inform user the action has been succesful
          console.log('Edit reservation was succesful');
          setShowMessageToast(true);
          setShowModal(false);
          updateReservationList(updatedReservation);
        } else {
          console.log('You have caused an error!');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = () => {
    const { firstName, lastName, phone, email } = newReservationData;

    if (!firstName) {
      setValidationError('Prosím vyplňte jméno.');
      return false;
    }

    if (!lastName) {
      setValidationError('Prosím vyplňte příjmení.');
      return false;
    }

    if (!phone || !email) {
      setValidationError('Prosím vyplňte všechny požadované údaje.');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Prosím vložte email ve správném formátu.');
      return false;
    }

    // Basic phone number validation
    const phoneRegex = /^\d{9}$/; // Adjust this regex based on your phone number format
    if (!phoneRegex.test(phone)) {
      setValidationError('Prosím vložte platné telefonní číslo.');
      return false;
    }

    // Clear any previous validation errors
    setValidationError('');
    return true;
  };

  return (
    <>
      <Button variant="warning" size="lg" className="me-1" onClick={() => setShowModal(true)}>
        <Pencil></Pencil>
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editace rezervace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Display validation error if present */}
            {validationError && <Alert>{validationError}</Alert>}
            <Form.Group controlId="firstName">
              <Form.Label>Jméno</Form.Label>
              <Form.Control
                type="text"
                value={newReservationData.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Příjmení</Form.Label>
              <Form.Control
                type="text"
                value={newReservationData.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Telefon</Form.Label>
              <Form.Control
                type="tel"
                value={newReservationData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newReservationData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Komentář (dobrovolné)</Form.Label>
              <Form.Control
                type="text"
                value={newReservationData.comment}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="selectedDate">
              <br></br>
              <Form.Label className = 'me-2'>Vyberte datum:</Form.Label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText=""
              />
              <br />
              Vybraný čas:
              <input
                type="time"
                className = 'ms-2'
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </Form.Group>
            <Form.Group>
              <DoctorSelector
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
              />
              <ClinicSelector
                selectedClinic={selectedClinic}
                setSelectedClinic={setSelectedClinic}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Uložit upravenou rezervaci
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditReservation;
