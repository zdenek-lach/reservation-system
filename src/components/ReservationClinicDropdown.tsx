import { useAppContext } from 'context/AppContext';
import { useClinics } from 'hooks/useClinics';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';

const ReservationClinicDropdown = () => {
  const { selectedClinic, setSelectedClinic, clinicList } = useAppContext();
  const { loadingClinics, errorClinics } = useClinics();

  const renderReservationClinicDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant='danger' id='dropdown-basic'>
          {selectedClinic != null
            ? `${selectedClinic.name} ${selectedClinic.location}`
            : 'Vyberte ambulanci'}
        </Dropdown.Toggle>

        <Dropdown.Menu>{listClinicsAsMenuItems()}</Dropdown.Menu>
      </Dropdown>
    );
  };

  const listClinicsAsMenuItems = () => {
    if (!Array.isArray(clinicList) || clinicList.length === 0) {
      return <Dropdown.Item key='empty'>ClinicList is empty</Dropdown.Item>;
    }

    return clinicList.map((clinic) => {
      const { id, name, location } = clinic;

      return (
        <Dropdown.Item key={id} onClick={() => setSelectedClinic(clinic)}>
          {`${name} ${location}`}
        </Dropdown.Item>
      );
    });
  };

  return loadingClinics ? (
    <Spinner animation='border' role='status' />
  ) : errorClinics ? (
    <div>
      <strong>
        {errorClinics == 'Network Error' &&
          'Chyba při načítání seznamu ordinací'}
      </strong>
    </div> // Adjust this part based on how you want to display errors
  ) : (
    renderReservationClinicDropdown()
  );
};

export default ReservationClinicDropdown;
