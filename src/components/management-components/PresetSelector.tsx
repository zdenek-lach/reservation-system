import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import { useEffect, useState } from 'react';
import { Button, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { authHeader, fetchLoggedDoctor } from 'security/AuthService';
import { CenterSpinner } from 'styles/StyledComponentsLib';
import Doctor from 'types/DoctorType';
import config from '../../../config/config.json';
import { TimeSlot } from './WeekGrid2';

type PresetSelectorProps = {
  presetName?: string;
  setPresetName?: (value: string) => void;
  clickedButtons: TimeSlot[];
  onSubmitNewPreset?: () => void;
};

const PresetSelector: React.FC<PresetSelectorProps> = ({
  presetName,
  setPresetName,
  clickedButtons,
}) => {
  const { selectedPreset, setSelectedPreset } = useAppContext();
  const [presetList, setPresetList] = useState([]);
  const [loggedInDoctor, setLoggedInDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPresets = async () => {
    try {
      const response = await axios.get(config.api.presetsApi.list, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Retrieving presets was successful');
        setPresetList(response.data);
      } else {
        console.log('You have caused an error!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPresets();
  }, []);

  const deleteSelectedPreset = () => {
    axios
      .delete(config.api.presetsApi.delete + `/${selectedPreset.id}`, {
        headers: { ...authHeader() },
      })
      .then((response) => {
        console.log(`Successfully deleted preset ${selectedPreset.id}`);
        console.log(response.status);

        setSelectedPreset(null);
        fetchPresets();
      })
      .catch((error) => {
        console.error(`Error deleting preset ${selectedPreset.id}:`, error);
      });
  };

  const editSelectedPreset = () => {
    // Create a new object based on the current selectedPreset
    const updatedPreset = { ...selectedPreset };

    // Reset the days
    updatedPreset.monday = [];
    updatedPreset.tuesday = [];
    updatedPreset.wednesday = [];
    updatedPreset.thursday = [];
    updatedPreset.friday = [];
    updatedPreset.saturday = [];
    updatedPreset.sunday = [];

    // Populate the days based on the clickedButtons
    clickedButtons.forEach((button) => {
      const dayOfWeek = new Date(button.day).toLocaleString('en-US', {
        weekday: 'long',
      });

      switch (dayOfWeek.toLowerCase()) {
        case 'monday':
          updatedPreset.monday.push(button.time);
          break;
        case 'tuesday':
          updatedPreset.tuesday.push(button.time);
          break;
        case 'wednesday':
          updatedPreset.wednesday.push(button.time);
          break;
        case 'thursday':
          updatedPreset.thursday.push(button.time);
          break;
        case 'friday':
          updatedPreset.friday.push(button.time);
          break;
        case 'saturday':
          updatedPreset.saturday.push(button.time);
          break;
        case 'sunday':
          updatedPreset.sunday.push(button.time);
          break;
        default:
          console.log(
            `Day ${dayOfWeek} is not accounted for in the Preset object.`
          );
      }
    });

    // Send the updatedPreset in the PUT request
    axios
      .put(
        config.api.presetsApi.edit + `/${selectedPreset.id}`,
        updatedPreset,
        {
          headers: { ...authHeader() },
        }
      )
      .then((response) => {
        console.log(`Successfully edited preset ${selectedPreset.id}`);
        console.log(response.status);
        fetchPresets();
      })
      .catch((error) => {
        console.error(`Error editing preset ${selectedPreset.id}:`, error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLoggedDoctor();
        setLoggedInDoctor(response);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchData();
  }, []);

  const submitNewPreset = async () => {
    const newPreset = {
      id: null,
      doctorId: loggedInDoctor ? loggedInDoctor.id : null,
      name: presetName,
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    clickedButtons.forEach((button) => {
      const dayOfWeek = new Date(button.day).toLocaleString('en-US', {
        weekday: 'long',
      });

      switch (dayOfWeek.toLowerCase()) {
        case 'monday':
          newPreset.monday.push(button.time);
          break;
        case 'tuesday':
          newPreset.tuesday.push(button.time);
          break;
        case 'wednesday':
          newPreset.wednesday.push(button.time);
          break;
        case 'thursday':
          newPreset.thursday.push(button.time);
          break;
        case 'friday':
          newPreset.friday.push(button.time);
          break;
        case 'saturday':
          newPreset.saturday.push(button.time);
          break;
        case 'sunday':
          newPreset.sunday.push(button.time);
          break;
        default:
          console.log(
            `Day ${dayOfWeek} is not accounted for in the Preset object.`
          );
      }
    });
    try {
      const response = await axios.post(config.api.presetsApi.add, newPreset, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Adding preset was successful');
        setSelectedPreset(newPreset);
        fetchPresets();

      } else {
        console.error('You have caused an error!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    console.log('Waiting for logged-in api');
    return <CenterSpinner />;
  }
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant='success' className='me-2 mt-3 mb-3'>
          {selectedPreset != null
            ? `Preset ${selectedPreset.name}`
            : 'Vyberte Preset'}
        </Dropdown.Toggle>
        {selectedPreset != null && (
          <InputGroup className='mb-3'>
            <Form.Control
              placeholder='Jméno presetu'
              aria-label='Jméno presetu'
              aria-describedby='preset-name'
              value={selectedPreset.name.toString()}
              onChange={(e) => {
                setPresetName(e.target.value);
                setSelectedPreset({ ...selectedPreset, name: e.target.value });
              }}
            />
          </InputGroup>
        )}
        {selectedPreset != null && (
          <>
            <Button variant='danger' onClick={deleteSelectedPreset}>
              Odstranit vybraný preset
            </Button>
            <Button variant='warning' onClick={editSelectedPreset}>
              Uložit provedené změny
            </Button>
          </>
        )}
        {selectedPreset == null && (
          <>
            <InputGroup className='mb-3'>
              <Form.Control
                placeholder='Jméno presetu'
                aria-label='Jméno presetu'
                aria-describedby='preset-name'
                value={presetName || ''}
                onChange={(e) => setPresetName(e.target.value)}
              />
            </InputGroup>
            <Button variant='primary' onClick={submitNewPreset}>
              Přidat nový preset
            </Button>
          </>
        )}
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSelectedPreset(null)}>
            Nový Preset
          </Dropdown.Item>
          {presetList &&
            presetList.map((preset) => (
              <Dropdown.Item
                key={preset.id}
                onClick={() => setSelectedPreset(preset)}
              >
                {`Preset ${preset.name}`}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default PresetSelector;
