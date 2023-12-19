import Reservation from './ReservationType';

type TimeBlock = {
  id: number;
  timeFrom: string;
  timeTo: string;
  reservations: Reservation[];
};
export default TimeBlock;
