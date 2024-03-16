import axios from 'axios';
import ChangePassword from 'components/ChangePassword';
import ClinicSelector from 'components/ClinicSelector';
import DoctorSelector from 'components/DoctorSelector';
import MessageToast from 'components/MessageToast';
import PresetSelector from 'components/PresetSelector';
import WeekGrid2, { TimeSlot } from 'components/WeekGrid2';
import { useAppContext } from 'context/AppContext';
import { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { PlusCircle, Trash2Fill } from 'react-bootstrap-icons';
import { authHeader } from 'security/AuthService';
import { styled } from 'styled-components';
import Clinic from 'types/ClinicType';
import Doctor from 'types/DoctorType';
import DoctorWorkhours from 'types/DoctorWorkhoursType';
import PresetType from 'types/PresetType';
import config from '../../config/config.json';
import FooterManagement from 'components/FooterManagement';

const StyledContainer = styled(Container)`
    margin-top: 20px;
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
  const { setShowMessageToast } = useAppContext();
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

  const convertClickedButtonsToPreset = () => {
    const newPreset: PresetType = {
      id: null,
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
    };

    clickedButtons.forEach((button) => {
      const dayOfWeek = new Date(button.day).toLocaleString('en-US', {
        weekday: 'long',
      });

      switch (dayOfWeek) {
        case 'Monday':
          newPreset.Monday.push(button.time);
          break;
        case 'Tuesday':
          newPreset.Tuesday.push(button.time);
          break;
        case 'Wednesday':
          newPreset.Wednesday.push(button.time);
          break;
        case 'Thursday':
          newPreset.Thursday.push(button.time);
          break;
        case 'Friday':
          newPreset.Friday.push(button.time);
          break;
        default:
          console.log(
            `Day ${dayOfWeek} is not accounted for in the Preset object.`
          );
      }
    });

    return newPreset;
  };

  const submitDoctorPresets = async () => {
    console.warn(convertClickedButtonsToPreset());
    try {
      const response = await axios.post(
        config.api.presetsApi.add, // Replace with your actual API endpoint
        convertClickedButtonsToPreset(),
        {
          headers: {
            ...authHeader(),
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // OK, inform user the action has been successful
        console.log('Adding preset was successful');
        setShowMessageToast(true); // If you have a toast for this action
      } else {
        console.log('You have caused an error!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <StyledContainer>
        <MessageToast message="Preset uložen!" />
        <Row>
          <Col md={3}>
            <h2>Můj profil</h2>
            <ChangePassword />
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
                  placeholder="MUDr."
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
                <Button variant="warning" onClick={addPoint} className='ms-2'>
                  <PlusCircle />
                </Button>
              </Form.Group>

              <Button variant="primary" type="submit">
                Uložit změny
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <Form onSubmit={submitDoctorPresets}>
              <Form.Group>
                <Form.Label>
                  <h3>Pracovní hodiny</h3>
                </Form.Label>
                <ClinicSelector
                  selectedClinic={selectedClinic}
                  setSelectedClinic={setSelectedClinic}
                />
                <PresetSelector />
                <WeekGrid2
                  startOfWeek={currentWeek}
                  setClickedButtons={setClickedButtons}
                />
              </Form.Group>
              <Button variant="danger" onClick={submitDoctorPresets}>
                Uložit preset
              </Button>
            </Form>
          </Col>
        </Row>
      </StyledContainer>
      <FooterManagement></FooterManagement>
    </Fragment>
  );
};

export default MyProfile;
