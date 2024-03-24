import axios from 'axios';
import { useAppContext } from 'context/AppContext';
import { useEffect, useState } from 'react';
import { authHeader } from 'security/AuthService';
import config from '../../config/config.json';

export const useReservations = () => {
  const { setReservationsList } = useAppContext();
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [errorReservations, setErrorReservations] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(config.api.reservationsApi.list, {
          headers: {
            ...authHeader(),
          },
        });
        setReservationsList(response.data);
        setLoadingReservations(false);
      } catch (err: any) {
        setErrorReservations(err.message);
        setLoadingReservations(false);
      }
    };

    fetchReservations();
  }, []);

  return { loadingReservations, errorReservations };
};
