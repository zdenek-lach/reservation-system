import DoctorSelector from 'components/DoctorSelector';
import WeekGrid2 from 'components/WeekGrid2';
import WeekPicker from 'components/WeekPicker';
import { useAppContext } from 'context/AppContext';
import { FormEventHandler, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { PlusCircle, Trash2Fill } from 'react-bootstrap-icons';
import { styled } from 'styled-components';
import Doctor from 'types/DoctorType';
import DoctorWorkhours from 'types/DoctorWorkhoursType';
import config from '../../config/config.json';

const MyProfile = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [firstName, setFirstName] = useState<string | null>('');
  const [lastName, setLastName] = useState<string | null>('');
  const [description, setDescription] = useState<string | null>('');
  const [points, setPoints] = useState<string[]>([]);
  const [title, setTitle] = useState<string | null>('');
  const [pictureId, setPictureId] = useState<number | null>(null);
  const [availableClinics, setDoctorWorkhours] = useState<
    DoctorWorkhours[] | null
  >([]);

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
      // Here you would send the updatedDoctor object to the server
      console.log(updatedDoctor);
      console.log(config.api.doctorsApi.edit);
    }
  };
  const submitDoctorWorkHours: FormEventHandler<HTMLFormElement> | undefined = (
    e
  ) => {
    e.preventDefault();
  };

  const StyledContainer = styled(Container)`
    margin-top: 20px;
    // margin-left: 2rem;
    background-color: rgba(255, 0, 0, 0.4);
    padding: 2rem;
            borderRadius: 15px,
            marginTop: 20px,
            marginLeft: 20px,
  `;

  return (
    <StyledContainer>
      <Row>
        <Col md={2}>
          {/* This will take up 4 out of 12 columns on medium and larger screens */}
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
          {/* This will take up 8 out of 12 columns on medium and larger screens */}
          <Form onSubmit={submitDoctorWorkHours}>
            <Form.Group>
              <Form.Label>
                <h3>Pracovní hodiny</h3>
              </Form.Label>

              <WeekPicker
                currentWeek={currentWeek}
                setCurrentWeek={setCurrentWeek}
              />
              <WeekGrid2 startOfWeek={currentWeek} />
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
