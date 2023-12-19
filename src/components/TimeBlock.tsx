import { Button } from '@chakra-ui/react';
import * as React from 'react';

interface TimeBlock {
  time: string;
}

const TimeBlock: React.FC<TimeBlock> = ({ time }) => {
  return (
    <Button colorScheme="blue" size="md" borderRadius="9999px">
      {time}
    </Button>
  );
};

export default TimeBlock;
