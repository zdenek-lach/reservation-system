import { useAppContext } from 'context/AppContext';
import { Dispatch, SetStateAction } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import Doctor from 'types/DoctorType';

interface DoctorFakerProps {
  loggedUser: Doctor | null;
  setLoggedUser: Dispatch<SetStateAction<Doctor | null>>;
}

const DoctorFaker: React.FC<DoctorFakerProps> = ({
  loggedUser,
  setLoggedUser,
}) => {
  const { doctorList } = useAppContext();
  return (
    <Container>
      <label>
        Jsem: Doktor:
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {loggedUser != null
              ? `${loggedUser.title} ${loggedUser.firstName} ${loggedUser.lastName}`
              : 'Vyberte Doktora'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {doctorList &&
              doctorList.map((doctor) => (
                <Dropdown.Item
                  key={doctor.id}
                  onClick={() => setLoggedUser(doctor)}
                >
                  {`${doctor.title} ${doctor.firstName} ${doctor.lastName}`}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </label>
    </Container>
  );
};

export default DoctorFaker;
