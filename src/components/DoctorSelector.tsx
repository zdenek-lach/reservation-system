import { useAppContext } from 'context/AppContext';
import { Dispatch, SetStateAction } from 'react';
import { Dropdown } from 'react-bootstrap';
import Doctor from 'types/DoctorType';

interface DoctorSelectorProps {
  selectedDoctor: Doctor | null;
  setSelectedDoctor: Dispatch<SetStateAction<Doctor | null>>;
}

const DoctorSelector: React.FC<DoctorSelectorProps> = ({
  selectedDoctor,
  setSelectedDoctor,
}) => {
  const { doctorList } = useAppContext();
  return (
    <label>
      <Dropdown>
        <Dropdown.Toggle variant='success' className = 'me-3 mt-3 mb-3'>
          {selectedDoctor != null
            ? `${selectedDoctor.title} ${selectedDoctor.firstName} ${selectedDoctor.lastName}`
            : 'Vyberte doktora'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {doctorList &&
            doctorList.map((doctor) => (
              <Dropdown.Item
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
              >
                {`${doctor.title} ${doctor.firstName} ${doctor.lastName}`}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </label>
  );
};

export default DoctorSelector;
