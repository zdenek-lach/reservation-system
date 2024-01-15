import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useAppContext } from 'context/AppContext';
import { useDoctors } from 'hooks/useDoctors';

const DoctorDropdown = () => {
  const { selectedDoctor, setSelectedDoctor, doctorList } = useAppContext();
  const { loadingDoctors, errorDoctors } = useDoctors();

  const renderDoctorDropdown = () => {
    return (
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {selectedDoctor != null
                ? selectedDoctor.title +
                  ' ' +
                  selectedDoctor.firstName +
                  ' ' +
                  selectedDoctor.lastName
                : 'Doctor'}
            </MenuButton>
            <MenuList>{listDoctorsAsMenuItems()}</MenuList>
          </>
        )}
      </Menu>
    );
  };

  const listDoctorsAsMenuItems = () => {
    if (!Array.isArray(doctorList) || doctorList.length === 0) {
      return <MenuItem key="empty">DoctorList is empty</MenuItem>;
    }

    return doctorList.map((doctor) => {
      const { id, title, firstName, lastName } = doctor;

      return (
        <MenuItem key={id} onClick={() => setSelectedDoctor(doctor)}>
          {`${id} ${title} ${firstName} ${lastName}`}
        </MenuItem>
      );
    });
  };

  return loadingDoctors ? (
    <Spinner />
  ) : errorDoctors ? (
    <Text>{errorDoctors}</Text>
  ) : (
    renderDoctorDropdown()
  );
};

export default DoctorDropdown;
