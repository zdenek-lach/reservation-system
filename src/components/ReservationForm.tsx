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
  //work - List of shifts from selected doctor, where the date is the same as the date of timeblock
  const work = selectedDoctor?.availableClinics.filter((x) => {
    if (x.clinic.name == selectedClinic?.name)
    {
      var dateCopy = new Date((x.date as unknown) as string);
      var csDateCopy = dateCopy.toLocaleDateString('cs-CZ');
      var csDate = date.toLocaleDateString('cs-CZ')
      var shiftTimeStartArray = x.timeFrom.split(':')
      var shiftTimeEndArray = x.timeTo.split(':')
      var timeblockTimeArray = time.split(':')
      var doesTimeMatchInShift = false;
      if(shiftTimeStartArray != undefined && shiftTimeStartArray != null && shiftTimeStartArray.length >= 2)
      {
        if(shiftTimeEndArray != undefined && shiftTimeEndArray != null && shiftTimeEndArray.length >= 2)
        {
          if(timeblockTimeArray != undefined && timeblockTimeArray != null && timeblockTimeArray.length >= 2)
          {
            var shiftTimeStartHour = (shiftTimeStartArray[0] as unknown) as number;
            //var shiftTimeStartMinute = (shiftTimeStartArray[1] as unknown) as number;
            var shiftTimeEndHour = (shiftTimeEndArray[0] as unknown) as number;
            //var shiftTimeEndMinute = (shiftTimeEndArray[1] as unknown) as number;
            var timeblockTimeHour = (timeblockTimeArray[0] as unknown) as number;
            //var timeblockTimeMinute = (timeblockTimeArray[1] as unknown) as number;
            if(timeblockTimeHour >= shiftTimeStartHour && timeblockTimeHour < shiftTimeEndHour)
            {
              doesTimeMatchInShift = true;
            }

          }
        }
      }
      if( csDate == csDateCopy)
      {
        return true && doesTimeMatchInShift;
      }
    }
    return false
  });
  //Check if there is any shift with the date same as the date of this timeblock (which is one level up from this)
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
