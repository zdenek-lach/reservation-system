import TimeBlock from './TimeBlockType';

type Day = {
  id: number;
  date: Date;
  timeBlocks: TimeBlock[];
};
export default Day;
