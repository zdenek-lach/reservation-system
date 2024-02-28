import axios from 'axios';
import ClinicSelector from 'components/ClinicSelector';
import DoctorSelector from 'components/DoctorSelector';
import WeekGrid2, { TimeSlot } from 'components/WeekGrid2';
import WeekPicker from 'components/WeekPicker';
import { useAppContext } from 'context/AppContext';
import { FormEventHandler, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { PlusCircle, Trash2Fill } from 'react-bootstrap-icons';
import { authHeader } from 'security/AuthService';
import { styled } from 'styled-components';
import Clinic from 'types/ClinicType';
import Doctor from 'types/DoctorType';
import DoctorWorkhours from 'types/DoctorWorkhoursType';
import config from '../../config/config.json';

const StyledContainer = styled(Container)`
    margin-top: 20px;
    // margin-left: 2rem;
    background-color: rgba(255, 0, 0, 0.4);
    padding: 2rem;
            borderRadius: 15px,
            marginTop: 20px,
            marginLeft: 20px,
  `;

const MyProfile = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [description, setDescription] = useState<string | null>('');
  const [points, setPoints] = useState<string[]>([]);
  const [title, setTitle] = useState<string | null>('');
  const [pictureId, setPictureId] = useState<number | null>(null);
  const [availableClinics, setDoctorWorkhours] = useState<
    DoctorWorkhours[] | null
  >([]);
  const [clickedButtons, setClickedButtons] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (selectedDoctor) {
      setFirstName(selectedDoctor.firstName);
      setLastName(selectedDoctor.lastName);
      setDescription(selectedDoctor.description);
      setPoints(selectedDoctor.points);
      setTitle(selectedDoctor.title);
      setPictureId(selectedDoctor.pictureId);
      setDoctorWorkhours(selectedDoctor.availableClinics);
    }
  }, [selectedDoctor]);

  const addPoint = () => {
    setPoints([...points, '']);
  };

  const deletePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const updatePoint = (index: number, value: string) => {
    setPoints(points.map((point, i) => (i === index ? value : point)));
  };

  const { currentWeek, setCurrentWeek } = useAppContext();

  const submitDoctorProfileChanges = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (selectedDoctor) {
      const updatedDoctor: Doctor = {
        ...selectedDoctor,
        firstName,
        lastName,
        description,
        points,
        title,
        pictureId,
        availableClinics,
      };

      const editUrl = config.api.doctorsApi.edit + `/${selectedDoctor.id}`;

      axios
        .put(editUrl, updatedDoctor, {
          headers: {
            ...authHeader(),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(`Successfully updated doctor ${selectedDoctor.id}`);
          // You can update your state here if necessary
        })
        .catch((error) => {
          console.error(`Error updating doctor ${selectedDoctor.id}:`, error);
        });
    }
  };
  const submitDoctorWorkHours: FormEventHandler<HTMLFormElement> | undefined = (
    e
  ) => {
    e.preventDefault();

    // Build the shifts array from clickedButtons
    let shifts = clickedButtons.map((slot) => ({
      date: new Date(slot.day).toISOString().split('T')[0],
      time: slot.time,
    }));

    // Build the data object to send to the backend
    let data = {
      doctor: selectedDoctor,
      clinic: selectedClinic,
      shifts: shifts,
    };
    
    console.warn(data);
    axios
      .post(config.api.shiftApi.addShift, data, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(`Successfully added a shift`);
        // You can update your state here if necessary
      })
      .catch((error) => {
        console.error(`Error adding a shift`, error);
      });
  };

  return (
    <StyledContainer>
      <Row>
        <Col md={2}>
          <h2>Můj profil</h2>
          <DoctorSelector
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
          />
          <Form onSubmit={submitDoctorProfileChanges}>
            <Form.Label>
              <h3>Profil lékaře</h3>
            </Form.Label>
            <Form.Group>
              <Form.Label>Titul</Form.Label>
              <Form.Control
                type="text"
                placeholder="MuDr."
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Jméno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Jan"
                value={firstName || ''}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Přijmení</Form.Label>
              <Form.Control
                type="text"
                placeholder="Novák"
                value={lastName || ''}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Obrázek</Form.Label>
              <Form.Control type="file" disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Popisek</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description || ''}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Body na profilu</Form.Label>
              {points.map((point, index) => (
                <div key={index}>
                  <Form.Control
                    type="text"
                    placeholder="Vložit nový bod"
                    value={point}
                    onChange={(e) => updatePoint(index, e.target.value)}
                    className=""
                  />
                  <Button variant="danger" onClick={() => deletePoint(index)}>
                    <Trash2Fill />
                  </Button>
                </div>
              ))}
              <Button variant="warning" onClick={addPoint}>
                <PlusCircle />
              </Button>
            </Form.Group>

            <Button variant="primary" type="submit">
              Uložit změny
            </Button>
          </Form>
        </Col>
        <Col md={8}>
          <Form onSubmit={submitDoctorWorkHours}>
            <Form.Group>
              <Form.Label>
                <h3>Pracovní hodiny</h3>
              </Form.Label>
              <WeekPicker
                currentWeek={currentWeek}
                setCurrentWeek={setCurrentWeek}
              />
              <ClinicSelector
                selectedClinic={selectedClinic}
                setSelectedClinic={setSelectedClinic}
              />
              <WeekGrid2
                startOfWeek={currentWeek}
                setClickedButtons={setClickedButtons}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Uložit změny
            </Button>
          </Form>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default MyProfile;
