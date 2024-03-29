import axios from 'axios';

import ClinicSelector from 'components/management-components/ClinicSelector';
import FooterManagement from 'components/management-components/FooterManagement';
import WeekGrid2, {
  TimeSlot,
} from 'components/management-components/WeekGrid2';
import { useAppContext } from 'context/AppContext';
import { useClinics } from 'hooks/useClinics';
import { useDoctors } from 'hooks/useDoctors';
import { Fragment, useState } from 'react';
import { Badge, Button, Container, Form, Modal, Table } from 'react-bootstrap';
import {
  ArrowCounterclockwise,
  InfoCircle,
  Pencil,
  Trash3Fill,
} from 'react-bootstrap-icons';
import { authHeader } from 'security/AuthService';
import Clinic from 'types/ClinicType';
import DoctorWorkhours from 'types/DoctorWorkhoursType';
import config from '../../config/config.json';
import Doctor from './../types/DoctorType';

const EmployeeManagement = () => {
  const { doctorList, setDoctorList, clinicList, currentWeek, setCurrentWeek } =
    useAppContext();
  const { loadingDoctors, errorDoctors } = useDoctors();

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clickedButtons, setClickedButtons] = useState<TimeSlot[]>([]);
  const [initialShifts, setInitialShifts] = useState<TimeSlot[]>([]);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPoints, setEditedPoints] = useState<string[]>([]);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPictureId, setEditedPictureId] = useState<number | null>(null);
  const [editedAvailableClinics, setEditedAvailableClinics] = useState<
    DoctorWorkhours[]
  >([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPoints, setNewPoints] = useState<string[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newPictureId, setNewPictureId] = useState<number | null>(null);
  const [newAvailableClinics, setNewAvailableClinics] = useState<
    DoctorWorkhours[]
  >([]);
  const [filterDoctor, setFilterDoctor] = useState<Doctor | null>(null);
  const [filterClinic, setFilterClinic] = useState<Clinic | null>(null);

  const { loadingClinics, errorClinics } = useClinics();

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const handleShowInfoModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowInfoModal(true);
  };

  const handleShowEditModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setEditedFirstName(doctor.firstName);
    setEditedLastName(doctor.lastName);
    setEditedDescription(doctor.description);
    setEditedPoints(doctor.points);
    setEditedTitle(doctor.title);
    setEditedPictureId(doctor.pictureId);
    setEditedAvailableClinics(doctor.availableClinics);

    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedDoctor(null);
    setShowInfoModal(false);
    setShowEditModal(false);
  };

  const handleDeleteDoctor = (doctor: Doctor) => {
    const deleteUrl = `${config.api.doctorsApi.delete}/${doctor.id}`;

    console.warn('deleting doctor id: ' + doctor.id);
    axios
      .delete(deleteUrl, {
        headers: {
          ...authHeader(),
        },
      })

      .then((response) => {
        console.log('Successfully deleted doctor ${doctor.id}');
        console.log(response.status);

        if (doctorList) {
          const updatedDoctors = doctorList.filter(
            (doc) => doc.id !== doctor.id
          );
          setDoctorList(updatedDoctors);
        }
      })
      .catch((error) => {
        console.error('Error deleting doctor ${doctor.id}:', error);
      });
  };
  const fetchDoctors = async () => {
    const getDoctorsUrl = config.api.doctorsApi.list;
    try {
      const response = await axios.get(getDoctorsUrl, {
        headers: {
          ...authHeader(),
        },
      });
      setDoctorList(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };
  const handleAddDoctor = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const addUrl = config.api.doctorsApi.add;
    const newDoctor = {
      name: newFirstName,
      surname: newLastName,
      description: newDescription,
      points: newPoints,
      title: newTitle,
      pictureId: newPictureId,
      availableClinics: newAvailableClinics,
    };
    axios
      .post(addUrl, newDoctor, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Successfully added new doctor');
        fetchDoctors(); // refresh the doctor list
      })
      .catch((error) => {
        console.error('Error adding new doctor:', error);
      });
  };

  const handleEditFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedFirstName(event.target.value);
  };

  const handleEditLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedLastName(event.target.value);
  };

  const handleEditDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedDescription(event.target.value);
  };

  const handleEditPoints = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPoints(event.target.value.split(',').map((point) => point.trim()));
  };
  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleEditPictureId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPictureId(Number(event.target.value));
  };

  const handleSaveChanges = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (selectedDoctor) {
      const editUrl = config.api.doctorsApi.edit + `/${selectedDoctor.id}`;

      const updatedDoctor = {
        id: selectedDoctor.id,
        firstName: editedFirstName,
        lastName: editedLastName,
        description: editedDescription,
        points: editedPoints,
        title: editedTitle,
        pictureId: editedPictureId,
        availableClinics: editedAvailableClinics,
      };
      axios
        .put(editUrl, updatedDoctor, {
          headers: {
            ...authHeader(),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('Successfully updated doctor ${selectedDoctor.id}');
          fetchDoctors(); // refresh the doctor list
        })
        .catch((error) => {
          console.error('Error updating doctor ${selectedDoctor.id}:', error);
        });
    }
  };

  return (
    <Fragment>
      <Container
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          padding: '30px',
          alignContent: 'center',
        }}
      >
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Vyhledat'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ClinicSelector
            selectedClinic={filterClinic}
            setSelectedClinic={setFilterClinic}
          />
          <Button
            variant='danger'
            onClick={() => {
              setSearchTerm('');
              setFilterDoctor(null);
              setFilterClinic(null);
            }}
          >
            <ArrowCounterclockwise />
          </Button>
        </Form.Group>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Obrázek ID</th>
              <th>Titul</th>
              <th>Jméno</th>
              <th>Příjmení</th>
              <th>Popis</th>
              <th>Body</th>
              <th>Dostupné kliniky</th>
              <th></th>
            </tr>
          </thead>
          <tbody
            style={{
              backgroundColor: 'white',
            }}
          >
            {doctorList != null &&
              doctorList
                .filter(
                  (doctor) =>
                    doctor.firstName
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    doctor.lastName
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    doctor.description
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    doctor.points
                      ?.join(', ')
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    doctor.title
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .filter(
                  (doctor) =>
                    filterDoctor == null || doctor.id === filterDoctor.id
                )
                .filter(
                  (doctor) =>
                    filterClinic == null ||
                    doctor.availableClinics.some(
                      (clinic) => clinic.clinic.id === filterClinic.id
                    )
                )
                .map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.pictureId}</td>
                    <td>{doctor.title}</td>
                    <td>{doctor.firstName}</td>
                    <td>{doctor.lastName}</td>
                    <td>{doctor.description}</td>
                    <td>
                      {doctor.points.map((point, index) => (
                        <Badge key={index}>{point}</Badge>
                      ))}
                    </td>
                    
                    <td>
                      {doctor.availableClinics.map((clinic) => (
                        <>
                        <Badge>
                          {clinic.clinic.name}
                        </Badge>
                      </>
                      ))}
                    </td>

                    <td>
                      <Button
                        variant='info'
                        size='lg'
                        className='mr-1'
                        onClick={() => handleShowInfoModal(doctor)}
                      >
                        <InfoCircle />
                      </Button>
                      <Button
                        variant='warning'
                        size='lg'
                        className='mr-1'
                        onClick={() => handleShowEditModal(doctor)}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant='danger'
                        size='lg'
                        onClick={() => handleDeleteDoctor(doctor)}
                      >
                        <Trash3Fill />
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
        <Button variant='success' onClick={() => setShowAddModal(true)}>
          Přidat nového doktora
        </Button>
        <Modal show={showInfoModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Informace o doktorovi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedDoctor && (
              <div>
                <div>
                  <strong>Číslo:</strong> {selectedDoctor.id}
                </div>
                <div>
                  <strong>Jméno:</strong> {selectedDoctor.firstName}
                </div>
                <div>
                  <strong>Příjmení:</strong> {selectedDoctor.lastName}
                </div>
                <div>
                  <strong>Popis:</strong> {selectedDoctor.description}
                </div>
                <div>
                  <strong>Body:</strong> {selectedDoctor.points.join(', ')}
                </div>
                <div>
                  <strong>Titul:</strong> {selectedDoctor.title}
                </div>
                <div>
                  <strong>Obrázek ID:</strong> {selectedDoctor.pictureId}
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Zavřít
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showEditModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editace doktora</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
              Jméno:
              <input
                type='text'
                value={editedFirstName}
                onChange={handleEditFirstName}
              />
            </label>
            <label>
              Příjmení:
              <input
                type='text'
                value={editedLastName}
                onChange={handleEditLastName}
              />
            </label>
            <label>
              Popis:
              <input
                type='text'
                value={editedDescription}
                onChange={handleEditDescription}
              />
            </label>
            <label>
              Body:
              <input
                type='text'
                value={editedPoints.join(', ')}
                onChange={handleEditPoints}
              />
            </label>
            <label>
              Titul:
              <input
                type='text'
                value={editedTitle}
                onChange={handleEditTitle}
              />
            </label>
            <label>
              Obrázek ID:
              <input
                type='number'
                value={editedPictureId || ''}
                onChange={handleEditPictureId}
              />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleCloseModal}>
              Zavřít
            </Button>
            <Button variant='primary' onClick={handleSaveChanges}>
              Uložit upraveného doktora
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Přidat nového doktora</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
              Jméno:
              <input
                type='text'
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
              />
            </label>
            <label>
              Příjmení:
              <input
                type='text'
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </label>
            <label>
              Popis:
              <input
                type='text'
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </label>
            <label>
              Body:
              <input
                type='text'
                value={newPoints.join(', ')}
                onChange={(e) =>
                  setNewPoints(
                    e.target.value.split(',').map((point) => point.trim())
                  )
                }
              />
            </label>
            <label>
              Titul:
              <input
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </label>
            <label>
              Obrázek ID:
              <input
                type='number'
                value={newPictureId || ''}
                onChange={(e) => setNewPictureId(Number(e.target.value))}
              />
            </label>
            <WeekGrid2
              startOfWeek={currentWeek}
              setClickedButtons={setClickedButtons}
              initialShifts={initialShifts}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowAddModal(false)}>
              Zavřít
            </Button>
            <Button variant='primary' onClick={handleAddDoctor}>
              Uložit nového doktora
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <FooterManagement></FooterManagement>
    </Fragment>
  );
};
export default EmployeeManagement;
