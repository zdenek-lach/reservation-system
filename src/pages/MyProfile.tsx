import axios from 'axios';
import MessageToast from 'components/MessageToast';
import ChangePassword from 'components/management-components/ChangePassword';
import FooterManagement from 'components/management-components/FooterManagement';
import PresetSelector from 'components/management-components/PresetSelector';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { PlusCircle, Trash2Fill } from 'react-bootstrap-icons';
import { authHeader, fetchLoggedDoctor } from 'security/AuthService';
import { styled } from 'styled-components';
import { CenterSpinner } from 'styles/StyledComponentsLib';
import Doctor from 'types/DoctorType';
import DoctorWorkhours from 'types/DoctorWorkhoursType';
import config from '../../config/config.json';

const StyledContainer = styled(Container)`
  margin-top: 20px;
`;

const MyProfile = () => {
  const [loggedInDoctor, setLoggedInDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [presetName, setPresetName] = useState<string | null>('');
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
    const fetchData = async () => {
      try {
        const response = await fetchLoggedDoctor();
        setLoggedInDoctor(response);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (loggedInDoctor) {
      setFirstName(loggedInDoctor.firstName);
      setLastName(loggedInDoctor.lastName);
      setDescription(loggedInDoctor.description);
      setPoints(loggedInDoctor.points);
      setTitle(loggedInDoctor.title);
      setPictureId(loggedInDoctor.pictureId);
      setDoctorWorkhours(loggedInDoctor.availableClinics);
    }
  }, [loggedInDoctor]);

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
    if (loggedInDoctor) {
      const updatedDoctor: Doctor = {
        ...loggedInDoctor,
        firstName,
        lastName,
        description,
        points,
        title,
        pictureId,
        availableClinics,
      };

      const editUrl = config.api.doctorsApi.edit + `/${loggedInDoctor.id}`;

      axios
        .put(editUrl, updatedDoctor, {
          headers: {
            ...authHeader(),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(`Successfully updated doctor ${loggedInDoctor.id}`);
          // You can update your state here if necessary
        })
        .catch((error) => {
          console.error(`Error updating doctor ${loggedInDoctor.id}:`, error);
        });
    }
  };

  if (loading) {
    return <CenterSpinner />;
  }

  return (
    <>
      <StyledContainer>
        <MessageToast message='Preset uložen!' />
        <Row>
          <Col md={3}>
            <h2>Můj profil</h2>
            <ChangePassword />
            <Form onSubmit={submitDoctorProfileChanges}>
              <Form.Label>
                <h3>Profil lékaře</h3>
              </Form.Label>
              <Form.Group>
                <Form.Label>Titul</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='MUDr.'
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Jméno</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Jan'
                  value={firstName || ''}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Přijmení</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Novák'
                  value={lastName || ''}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Obrázek</Form.Label>
                <Form.Control type='file' disabled />
              </Form.Group>
              <Form.Group>
                <Form.Label>Popisek</Form.Label>
                <Form.Control
                  as='textarea'
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
                      type='text'
                      placeholder='Vložit nový bod'
                      value={point}
                      onChange={(e) => updatePoint(index, e.target.value)}
                      className=''
                    />
                    <Button variant='danger' onClick={() => deletePoint(index)}>
                      <Trash2Fill />
                    </Button>
                  </div>
                ))}
                <Button variant='warning' onClick={addPoint} className='ms-2'>
                  <PlusCircle />
                </Button>
              </Form.Group>

              <Button variant='primary' type='submit'>
                Uložit změny
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <Form>
              <Form.Group>
                <Form.Label>
                  <h3>Pracovní hodiny - preset</h3>
                </Form.Label>
                <PresetSelector
                  presetName={presetName}
                  setPresetName={setPresetName}
                  loggedInDoctor={loggedInDoctor}
                  loading={loading}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </StyledContainer>
      <FooterManagement />
    </>
  );
};

export default MyProfile;
