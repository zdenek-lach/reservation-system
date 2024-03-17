import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import { useEffect, useState } from 'react';
import config from '../../config/config.json';

export const usePresets = () => {
  const { setPresetList } = useAppContext();
  const [loadingPresets, setLoadingPresets] = useState(true);
  const [errorPresets, setErrorPresets] = useState('');

  useEffect(() => {
    const fetchPresets = async () => {
      try {
        const response = await axios.get(config.api.presetsApi.list);
        setPresetList(response.data);
        setLoadingPresets(false);
      } catch (err: any) {
        setErrorPresets(err.message);
        setLoadingPresets(false);
      }
    };

    fetchPresets();
  }, []);

  return { loadingPresets, errorPresets };
};
