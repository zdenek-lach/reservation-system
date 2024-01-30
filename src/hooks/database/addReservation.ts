import axios from 'axios';
import config from '../../../config/config.json';
import ReservationData from 'types/ReservationData';
import ReservationDto from 'types/ReservationDtoType';

export const addDataToDB = async (dataToAdd: ReservationData) => {
    try {
      var dto:ReservationDto = {clinicId: dataToAdd.clinic.id, date:dataToAdd.date, email:dataToAdd.email, 
        employeeId:dataToAdd.doctor.id, name: dataToAdd.firstName, note:dataToAdd.comment, phone: dataToAdd.phone,
        surname:dataToAdd.lastName, timeFrom: dataToAdd.time};
      const jsonData = JSON.stringify(dto);
      const response = await axios.post(config.api.addReservationApiUrl, jsonData, {
          headers: {
            'Content-Type': 'application/json',
          },
      })

      if (response.status === 200){
        //OK write to user that it has been successful
      }
      else{
        //NOT OK, log this, tell user he fucked up
      }
    } catch (error) {
        //log this error somewhere
    }
}