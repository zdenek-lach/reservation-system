import { useAppContext } from 'context/AppContext';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { fetchLoggedDoctor } from 'security/AuthService';
import Doctor from 'types/DoctorType';

interface DoctorSelectorProps {
  selectedDoctor?: Doctor | null;
  setSelectedDoctor?: Dispatch<SetStateAction<Doctor | null>>;
}

const DoctorSelector: React.FC<DoctorSelectorProps> = ({
  selectedDoctor,
  setSelectedDoctor,
}) => {
  const {
    doctorList,
    selectedDoctor: contextSelectedDoctor,
    setSelectedDoctor: contextSetSelectedDoctor,
  } = useAppContext();

  useEffect(() => {
    fetchLoggedDoctor().then((doctor) => {
      if (doctor != null) {
        setSelectedDoctor(doctor);
        contextSetSelectedDoctor(doctor);
      } else {
        console.error('Failed to fetch logged doctor!');
      }
    });
  }, []);

  return (
    <>
      {contextSelectedDoctor === null && (
        <label>
          <Dropdown>
            <Dropdown.Toggle variant='success' className='me-3 mt-3 mb-3'>
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
      )}
    </>
  );
};

export default DoctorSelector;
