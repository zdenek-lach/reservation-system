import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { authHeader } from 'security/AuthService';
import Doctor from 'types/DoctorType';
import type PresetType from 'types/PresetType';
import config from '../../../config/config.json';
import WeekGrid2, { TimeSlot } from './WeekGrid2';

type PresetSelectorProps = {
  clickedButtons?: TimeSlot[];
  loggedInDoctor: Doctor | null;
  loading: boolean;
};

const PresetSelector2 = ({ loggedInDoctor, loading }: PresetSelectorProps) => {
  const { selectedPreset, setSelectedPreset } = useAppContext();
  const [presetList, setPresetList] = useState([]);
  const [presetTimes, setPresetTimes] = useState<TimeSlot[]>([]);
  const [clickedButtons, setClickedButtons] = useState<TimeSlot[]>([]);
  const [presetName, setPresetName] = useState('');

  // Fetch presets from the API
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

  const handlePresetSelected = (preset: PresetType) => {
    setSelectedPreset(preset); // Set the selected preset
    // Convert the selected preset into a format that can be used by the WeekGrid2 component
    const convertedPresetsToTimeslots = convertPresetToTimeBlocks(
      preset,
      currentWeek
    );
    // Update the initial shifts to match the selected preset
    setPresetTimes(convertedPresetsToTimeslots);
    setPresetName(preset.name);
  };

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
  const submitNewPreset = () => {
    // ... (create newPreset object based on clickedButtons)
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
      newPreset[dayOfWeek.toLowerCase()].push(button.time);
    });

    axios
      .post(config.api.presetsApi.add, newPreset, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        console.log('Adding preset was successful');
        setSelectedPreset(newPreset);
        fetchPresets();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editSelectedPreset = () => {
    const newPreset = {
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
      newPreset[dayOfWeek.toLowerCase()].push(button.time);
    });

    console.log(newPreset);
    axios
      .put(config.api.presetsApi.edit + `/${selectedPreset.id}`, newPreset, {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        console.log('Edit of preset was successful');
        fetchPresets();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCurrentWeek = () => {
    const date = new Date();
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    date.setDate(diff);
    date.setHours(0, 0, 0, 0);
    return date;
  };
  const currentWeek = getCurrentWeek();

  const convertPresetToTimeBlocks = (
    preset: PresetType,
    currentWeek: Date
  ): TimeSlot[] => {
    const daysOfWeek = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    let timeSlots: TimeSlot[] = [];

    daysOfWeek.forEach((day, index) => {
      const dayDate = new Date(
        currentWeek.getFullYear(),
        currentWeek.getMonth(),
        currentWeek.getDate() + index,
        0,
        0,
        0,
        0 // Sets the time to 00:00:00.000
      );

      preset[day].forEach((time) => {
        timeSlots.push({ day: dayDate, time });
      });
    });

    return timeSlots;
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={3}>
            <Dropdown>
              <Dropdown.Toggle variant='success' className='me-2 mt-3 mb-3'>
                {selectedPreset != null
                  ? `Preset ${selectedPreset.name}`
                  : 'Vytvořit nový preset'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedPreset(null)}>
                  {'Nový Preset'}
                </Dropdown.Item>

                {presetList &&
                  presetList.map((preset) => (
                    <Dropdown.Item
                      key={preset.id}
                      onClick={() => handlePresetSelected(preset)}
                    >
                      {`Preset ${preset.name}`}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col sm={3}>
            {selectedPreset != null && (
              <Button variant='danger' onClick={deleteSelectedPreset}>
                Odstranit vybraný preset
              </Button>
            )}
          </Col>
        </Row>
        {
          <Row>
            <Col sm={4}>
              {selectedPreset === null && (
                <InputGroup>
                  {
                    <Form.Control
                      placeholder='Zvolte jméno nového presetu'
                      aria-describedby='preset-name'
                      value={presetName || ''}
                      onChange={(e) => setPresetName(e.target.value)}
                    />
                  }
                </InputGroup>
              )}
            </Col>
          </Row>
        }
        {
          <Row>
            <Col sm={12}>
              {selectedPreset != null && (
                <InputGroup className='mb-3'>
                  <Form.Control
                    placeholder='Jméno presetu'
                    aria-label='Jméno presetu'
                    aria-describedby='preset-name'
                    value={selectedPreset.name.toString()}
                    onChange={(e) => {
                      setPresetName(e.target.value);
                      setSelectedPreset({
                        ...selectedPreset,
                        name: e.target.value,
                      });
                    }}
                  />
                </InputGroup>
              )}
            </Col>
          </Row>
        }
        {
          <Row>
            <Col sm={12}>
              <WeekGrid2
                startOfWeek={currentWeek}
                initialShifts={presetTimes}
                setClickedButtons={setClickedButtons}
                isPresetMode={true}
              />
            </Col>
          </Row>
        }
        {
          <Row>
            <Col sm={4}>
              {selectedPreset == null && (
                <Button variant='primary' onClick={submitNewPreset}>
                  Přidat nový preset
                </Button>
              )}
              {selectedPreset != null && (
                <Button variant='warning' onClick={editSelectedPreset}>
                  Uložit provedené změny
                </Button>
              )}
            </Col>
          </Row>
        }
      </Container>
    </>
  );
};

export default PresetSelector2;
