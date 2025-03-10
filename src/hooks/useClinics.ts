import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import { useEffect, useState } from 'react';
import config from '../../config/config.json';

export const useClinics = () => {
  const { setClinicList } = useAppContext();
  const [loadingClinics, setLoadingClinics] = useState(true);
  const [errorClinics, setErrorClinics] = useState<string>(''); // Add type annotation

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get(config.api.clinicsApi.list);
        setClinicList(response.data);
        setLoadingClinics(false);
      } catch (err: any) {
        setErrorClinics(err.message);
        setLoadingClinics(false);
      }
    };

    fetchClinics();
  }, [setClinicList]);

  return { loadingClinics, errorClinics };
};
