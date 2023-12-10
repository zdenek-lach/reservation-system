// WeekPicker.tsx

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

interface WeekPickerProps {
  // Add any additional props you might need
}

const WeekPicker: React.FC<WeekPickerProps> = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getFormattedDate = (date: Date): string => {
    return date.toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const startOfWeek = new Date(currentWeek);
  const dayOfWeek = startOfWeek.getDay();
  const diff = (dayOfWeek + 6) % 7;
  startOfWeek.setDate(startOfWeek.getDate() - diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      width="350px"
      margin="20px"
      borderRadius="8px"
      backgroundColor="#EDF2F7"
      padding="10px"
      textAlign="center"
    >
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Previous Week"
        onClick={handlePrevWeek}
      />
      <Text fontSize="1em" fontWeight="bold" m="10px">
        {getFormattedDate(startOfWeek)} - {getFormattedDate(endOfWeek)}
      </Text>
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label="Next Week"
        onClick={handleNextWeek}
      />
    </Flex>
  );
};

export default WeekPicker;
