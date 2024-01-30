import axios from 'axios';
import config from '../../../config/config.json';
import ReservationData from 'types/ReservationData';

export const addDataToDB = async (dataToAdd: ReservationData) => {
    const jsonData = JSON.stringify(dataToAdd)
    try {
        const response = await axios.post(config.api.addReservationApiUrl, jsonData, {
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (response.status === 200){
            //OK
          }
          else{
            //NOT OK, log this
          }
    } catch (error) {
        //log this error somewhere
    }
}