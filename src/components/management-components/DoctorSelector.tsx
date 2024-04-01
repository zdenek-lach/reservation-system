import { useAppContext } from 'context/AppContext';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import Doctor from 'types/DoctorType';

interface DoctorSelectorProps {
  setDoctorToThis?: Dispatch<SetStateAction<Doctor | null>>;
}
const DoctorSelector: React.FC<DoctorSelectorProps> = ({ setDoctorToThis }) => {
  const { doctorList, selectedDoctor, setSelectedDoctor } = useAppContext();

  return (
    <>
      {
        <label>
          <Dropdown>
            <Dropdown.Toggle variant='success' className='me-3 mt-3 mb-3'>
              {selectedDoctor != null
                ? `${selectedDoctor.title} ${selectedDoctor.firstName} ${selectedDoctor.lastName}`
                : 'Vyberte spravovaného doktora'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {doctorList &&
                doctorList.map((doctor) => (
                  <Dropdown.Item
                    key={doctor.id}
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setDoctorToThis && setDoctorToThis(doctor);
                    }}
                  >
                    {`${doctor.title} ${doctor.firstName} ${doctor.lastName}`}
                  </Dropdown.Item>
                ))}
            </Dropdown.Menu>
          </Dropdown>
        </label>
      }
    </>
  );
};

export default DoctorSelector;
