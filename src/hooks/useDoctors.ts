import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import { useEffect, useState } from 'react';
import config from '../../config/config.json';

export const useDoctors = () => {
  const { setDoctorList } = useAppContext();
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [errorDoctors, setErrorDoctors] = useState<string>(''); // Add type annotation

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(config.api.doctorsApi.list);
        setDoctorList(response.data);
        setLoadingDoctors(false);
      } catch (err: any) {
        setErrorDoctors(err.message);
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, [setDoctorList]);

  return { loadingDoctors, errorDoctors };
};