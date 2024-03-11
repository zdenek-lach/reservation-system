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
      Doktor:
      <Dropdown>
        <Dropdown.Toggle variant='success'>
          {selectedDoctor != null
            ? `${selectedDoctor.title} ${selectedDoctor.firstName} ${selectedDoctor.lastName}`
            : 'Vyberte Doktora'}
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
