import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

export const useDoctors = () => {
  const { setDoctorList } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/api/doctor');
        setDoctorList(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return { loading, error };
};
