import { useAppContext } from 'context/AppContext';
import { useDoctors } from 'hooks/useDoctors';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';

const DoctorDropdown = () => {
  const { selectedDoctor, setSelectedDoctor, doctorList } = useAppContext();
  const { loadingDoctors, errorDoctors } = useDoctors();

  const renderDoctorDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedDoctor != null
            ? `${selectedDoctor.title} ${selectedDoctor.firstName} ${selectedDoctor.lastName}`
            : 'Vyberte Doktora'}
        </Dropdown.Toggle>

        <Dropdown.Menu>{listDoctorsAsMenuItems()}</Dropdown.Menu>
      </Dropdown>
    );
  };

  const listDoctorsAsMenuItems = () => {
    if (!Array.isArray(doctorList) || doctorList.length === 0) {
      return <Dropdown.Item key="empty">DoctorList is empty</Dropdown.Item>;
    }

    return doctorList.map((doctor) => {
      const { id, title, firstName, lastName } = doctor;

      return (
        <Dropdown.Item key={id} onClick={() => setSelectedDoctor(doctor)}>
          {`${id} ${title} ${firstName} ${lastName}`}
        </Dropdown.Item>
      );
    });
  };

  return loadingDoctors ? (
    <Spinner animation="border" role="status" />
  ) : errorDoctors ? (
    <div>
      <strong>
        {errorDoctors == 'Network Error' && 'Chyba při načítání seznamu lékařů'}
      </strong>
    </div> // Adjust this part based on how you want to display errors
  ) : (
    renderDoctorDropdown()
  );
};

export default DoctorDropdown;
