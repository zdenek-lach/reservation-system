import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import { useEffect, useState } from 'react';
import { Button, Dropdown, Form, InputGroup } from 'react-bootstrap';
import { authHeader } from 'security/AuthService';
import config from '../../config/config.json';

type PresetSelectorProps = {
  presetName?: string;
  setPresetName?: (value: string) => void;
  clickedButtons: TimeSlot[];
};
//TODO add null preset on the top of the list (labeled NEW PRESET or smt)
//fix adding the preset formatting (2 buttons lmao)
const PresetSelector: React.FC<PresetSelectorProps> = ({
  presetName,
  setPresetName,
  clickedButtons,
}) => {
  const { selectedPreset, setSelectedPreset } = useAppContext();
  const [presetList, setPresetList] = useState([]);

  const deleteSelectedPreset = () => {
    axios
      .delete(config.api.presetsApi.delete + `/${selectedPreset.id}`, {
        headers: { ...authHeader() },
      })
      .then((response) => {
        console.log(`Successfully deleted preset ${selectedPreset.id}`);
        console.log(response.status);

        setSelectedPreset(null);
      })
      .catch((error) => {
        console.error(`Error deleting preset ${selectedPreset.id}:`, error);
      });
  };

  const editSelectedPreset = () => {
    axios
      .put(
        config.api.presetsApi.edit + `/${selectedPreset.id}`,
        selectedPreset,
        {
          headers: { ...authHeader() },
        }
      )
      .then((response) => {
        console.log(`Successfully edited preset ${selectedPreset.id}`);
        console.log(response.status);
      })
      .catch((error) => {
        console.error(`Error editing preset ${selectedPreset.id}:`, error);
      });
  };

  const submitNewPreset = async () => {
    const newPreset = {
      id: null,
      doctorId: selectedDoctor ? selectedDoctor.id : null,
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
      } else {
        console.log('You have caused an error!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

    fetchPresets();
  }, []);

  return (
    <label>
      <Dropdown>
        <Dropdown.Toggle variant="success" className="me-2 mt-3 mb-3">
          {selectedPreset != null
            ? `Preset ${selectedPreset.name}`
            : 'Vyberte Preset'}
        </Dropdown.Toggle>
        {selectedPreset != null && (
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Jméno presetu"
              aria-label="Jméno presetu"
              aria-describedby="preset-name"
              value={selectedPreset.name}
              onChange={(e) => {
                setPresetName(e.target.value);
                setSelectedPreset({ ...selectedPreset, name: e.target.value });
              }}
            />
          </InputGroup>
        )}
        {selectedPreset != null && (
          <>
            <Button variant="danger" onClick={deleteSelectedPreset}>
              Odstranit vybraný preset
            </Button>
            <Button variant="warning" onClick={editSelectedPreset}>
              Edit selected preset
            </Button>
          </>
        )}
        {selectedPreset == null && (
          <>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Jméno presetu"
                aria-label="Jméno presetu"
                aria-describedby="preset-name"
                value={presetName || ''}
                onChange={(e) => setPresetName(e.target.value)}
              />
            </InputGroup>
            <Button variant="primary" onClick={submitNewPreset}>
              Add new preset
            </Button>
          </>
        )}
        <Dropdown.Menu>
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
    </label>
  );
};

export default PresetSelector;
