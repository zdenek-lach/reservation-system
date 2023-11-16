import { Box, BoxProps, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

interface TimeProps extends BoxProps {
  time: string;
  onClick: () => void;
  isSelected: boolean;
}

const Time: React.FC<TimeProps> = ({ time, onClick, isSelected, ...rest }) => {
  const [localSelected, setLocalSelected] = useState(isSelected);

  const handleTimeClick = () => {
    setLocalSelected((prev) => !prev);
    onClick();
  };

  return (
    <Box
      onClick={handleTimeClick}
      cursor="pointer"
      borderRadius="md"
      p={2}
      bgColor={localSelected ? 'teal.500' : 'gray.200'}
      color={localSelected ? 'white' : 'black'}
      {...rest}
    >
      <Text>{time}</Text>
    </Box>
  );
};

export default Time;
