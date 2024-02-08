import { log } from 'console';
import { useAppContext } from 'context/AppContext';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import DoctorWorkhours from 'types/DoctorWorkhoursType';
import ReservationData from 'types/ReservationData';

interface ReservationFormProps {
  time: string;
  date: Date;
  onFormSubmit: (data: ReservationData) => void;
  onShowSummary: () => void;
}

class WorkDateTime {
  date: Date = new Date();
  time: string = "";
  constructor(date: Date, time: string){
    this.date = date;
    this.time = time;
  }
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  time,
  date,
  onFormSubmit,
  onShowSummary,
}) => {
  const [show, setShow] = useState(false);

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
    setShow(false); // Close the modal
    onShowSummary();
  };

  enum ButtonType {
    Enabled = "success",
    Disabled = "danger",
  }

  var enabledButton: ButtonType = ButtonType.Disabled;
  const work = selectedDoctor?.availableClinics.filter((x) => {
    if (x.clinic.name == selectedClinic?.name)
    {
      var dateCopy = new Date((x.date as string));
      var csDateCopy =  dateCopy.toLocaleDateString('cs-CZ');
      var csDate = date.toLocaleDateString('cs-CZ')
      if( csDate == csDateCopy)
      {
        return true;
      }
    }
    return false
  });
  var workDateTimeList: WorkDateTime[] = [];

  work?.forEach(entry => {
    workDateTimeList.push(new WorkDateTime(entry.date, entry.timeFrom))
  });
  if(work != undefined && work.length > 0)
  {
    enabledButton = ButtonType.Enabled;
  }

  return (
    <>
      <Button
        style={{
          borderRadius: '20px',
        }}
        variant={enabledButton}
        onClick={() => setShow(true)}
      >
        {time}
      </Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rezervace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="selectedDate">
              <Form.Label>
                Vybrané datum: {date.toLocaleDateString('cs-CZ')}
              </Form.Label>
              <br />
              <Form.Label>Vybraný čas: {time}</Form.Label>
            </Form.Group>
            <Form.Group controlId="firstName">
              <Form.Label>Jméno</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Příjmení</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Telefon</Form.Label>
              <Form.Control
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="comment">
              <Form.Label>Komentář (dobrovolné)</Form.Label>
              <Form.Control
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleFormSubmit}>
            Odeslat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReservationForm;
