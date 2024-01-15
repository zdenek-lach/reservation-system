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
import { useClinics } from 'hooks/useClinics';

const ClinicDropdown = () => {
  const { selectedClinic, setSelectedClinic, clinicList } = useAppContext();
  const { loadingClinics, errorClinics } = useClinics();

  const renderClinicDropdown = () => {
    return (
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {selectedClinic != null
                ? selectedClinic.name + ' ' + selectedClinic.location
                : 'Clinic'}
            </MenuButton>
            <MenuList>{listClinicsAsMenuItems()}</MenuList>
          </>
        )}
      </Menu>
    );
  };

  const listClinicsAsMenuItems = () => {
    if (!Array.isArray(clinicList) || clinicList.length === 0) {
      return <MenuItem key="empty">ClinicList is empty</MenuItem>;
    }

    return (
      <>
        {clinicList.map((clinic) => (
          <MenuItem key={clinic.id} onClick={() => setSelectedClinic(clinic)}>
            {clinic.id + clinic.name + ' ' + clinic.location}
          </MenuItem>
        ))}
      </>
    );
  };

  return loadingClinics ? (
    <Spinner />
  ) : errorClinics ? (
    <Text>{errorClinics}</Text>
  ) : (
    renderClinicDropdown()
  );
};

export default ClinicDropdown;
