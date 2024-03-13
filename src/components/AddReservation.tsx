import axios from 'axios';
import { useState } from 'react';
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

const AddReservation = () => {
  const [showModal, setShowModal] = useState(false);
  const [newReservationData, setNewReservationData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    comment: '',
  });
  const [validationError, setValidationError] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>();
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>();
  const { setShowMessageToast } = useAppContext();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReservationData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e: { target: { value: string } }) => {
    const hours = e.target.value.split(':')[0];
    setSelectedTime(`${hours}:00`);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data: ReservationData = {
          date: selectedDate.toLocaleDateString('cs-CZ'),
          time: selectedTime,
          doctor: selectedDoctor,
          clinic: selectedClinic,
          ...newReservationData,
        };

        const reservationToAdd: ReservationDto = {
          clinicId: data.clinic.id,
          date: data.date,
          email: data.email,
          employeeId: data.doctor.id,
          name: data.firstName,
          note: data.comment,
          phone: data.phone,
          surname: data.lastName,
          timeFrom: data.time,
        };

        const response = await axios.post(
          config.api.reservationsApi.add,
          reservationToAdd,
          {
            headers: {
              ...authHeader(),
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          // OK, inform user the action has been succesful
          console.log('Adding reservation was succesful');
          setShowMessageToast(true);
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
      setValidationError('Prosím vyplňte své jméno.');
      return false;
    }

    if (!lastName) {
      setValidationError('Prosím vyplňte své příjmení.');
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
      <Button variant="danger" onClick={() => setShowModal(true)}>
        Přidat novou rezervaci
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nová rezervace</Modal.Title>
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
            <br></br>
            <Form.Group controlId="selectedDate">
              <Form.Label className = 'me-2'>Vyberte datum:</Form.Label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText=""
              />
              <br/>
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
          <Button variant="success" onClick={handleSubmit}>
            Odeslat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddReservation;
