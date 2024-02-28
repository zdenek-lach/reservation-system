import { useAppContext } from 'context/AppContext';
import { Dispatch, SetStateAction } from 'react';
import { Dropdown } from 'react-bootstrap';
import Clinic from 'types/ClinicType';

interface ClinicSelectorProps {
  selectedClinic: Clinic | null;
  setSelectedClinic: Dispatch<SetStateAction<Clinic | null>>;
}

const ClinicSelector: React.FC<ClinicSelectorProps> = ({
  selectedClinic,
  setSelectedClinic,
}) => {
  const { clinicList } = useAppContext();
  return (
    <label>
      Clinic:
      <Dropdown>
        <Dropdown.Toggle variant="success">
          {selectedClinic != null
            ? `${selectedClinic.name}`
            : 'Vyberte ambulanci'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {clinicList &&
            clinicList.map((clinic) => (
              <Dropdown.Item
                key={clinic.id}
                onClick={() => setSelectedClinic(clinic)}
              >
                {`${clinic.name}`}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </label>
  );
};

export default ClinicSelector;
