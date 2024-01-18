import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import { useEffect, useState } from 'react';
import config from '../../config/config.json';
export const useReservations = () => {
  const { setReservationsList } = useAppContext();
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [errorReservations, setErrorReservations] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(config.api.reservationsApiUrl);
        setReservationsList(response.data);
        setLoadingReservations(false);
      } catch (err: any) {
        setErrorReservations(err.message);
        setLoadingReservations(false);
      }
    };

    fetchDoctors();
  }, []);

  return { loadingReservations, errorReservations };
};
