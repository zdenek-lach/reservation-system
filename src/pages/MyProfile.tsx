import DoctorFaker from 'components/DoctorFaker';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { PlusCircle, Trash2Fill } from 'react-bootstrap-icons';
import styled from 'styled-components';
import Doctor from 'types/DoctorType';
import DoctorWorkhours from 'types/DoctorWorkhoursType';
import config from '../../config/config.json';

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const StyledForm = styled(Form)`
  margin-bottom: 20px;
`;

const MyProfile = () => {
  const [loggedUser, setLoggedUser] = useState<Doctor | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [points, setPoints] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [pictureId, setPictureId] = useState<number>(0);
  const [availableClinics, setAvailableClinics] = useState<DoctorWorkhours[]>(
    []
  );

  useEffect(() => {
    if (loggedUser) {
      setFirstName(loggedUser.firstName);
      setLastName(loggedUser.lastName);
      setDescription(loggedUser.description);
      setPoints(loggedUser.points);
      setTitle(loggedUser.title);
      setPictureId(loggedUser.pictureId);
      setAvailableClinics(loggedUser.availableClinics);
    }
  }, [loggedUser]);

  const addPoint = () => {
    setPoints([...points, '']);
  };

  const deletePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const updatePoint = (index: number, value: string) => {
    setPoints(points.map((point, i) => (i === index ? value : point)));
  };

  const submitDoctorProfileChanges = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (loggedUser) {
      const updatedDoctor: Doctor = {
        ...loggedUser,
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

  return (
    <StyledContainer>
      <Row>
        <Col>
          <h2>Můj profil</h2>
          <DoctorFaker loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
          <StyledForm onSubmit={submitDoctorProfileChanges}>
            <Form.Group>
              <Form.Label>Titul</Form.Label>
              <Form.Control
                type="text"
                placeholder="MuDr."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Jméno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Jan"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Přijmení</Form.Label>
              <Form.Control
                type="text"
                placeholder="Novák"
                value={lastName}
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
                value={description}
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
          </StyledForm>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default MyProfile;
