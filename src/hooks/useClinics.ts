import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const useClinics = () => {
  const { setClinicList } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get('/api/clinics');
        setClinicList(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  return { loading, error };
};
