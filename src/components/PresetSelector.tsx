import { useAppContext } from 'context/AppContext';
import { Dropdown } from 'react-bootstrap';

const PresetSelector = () => {
  const { presetList, selectedPreset, setSelectedPreset } = useAppContext();
  return (
    <label>
      <Dropdown>
        <Dropdown.Toggle variant="success" className="me-2 mt-3 mb-3">
          {selectedPreset != null
            ? `Preset ${selectedPreset.id}`
            : 'Vyberte Preset'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {presetList &&
            presetList.map((preset) => (
              <Dropdown.Item
                key={preset.id}
                onClick={() => setSelectedPreset(preset)}
              >
                {`Preset ${preset.id}`}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
    </label>
  );
};

export default PresetSelector;
