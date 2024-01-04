import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

// Updated the interface to include currentWeek and setCurrentWeek
interface WeekPickerProps {
  currentWeek: Date;
  setCurrentWeek: (date: Date) => void;
}

const WeekPicker: React.FC<WeekPickerProps> = ({
  currentWeek,
  setCurrentWeek,
}) => {
  const getFormattedDate = (date: Date): string => {
    return date.toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const handlePrevWeek = () => {
    // Used getTime() to avoid mutating the original date
    const prevWeek = new Date(currentWeek.getTime());
    prevWeek.setDate(prevWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const handleNextWeek = () => {
    // Used getTime() to avoid mutating the original date
    const nextWeek = new Date(currentWeek.getTime());
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  // Calculate the start of the week (Monday)
  const startOfWeek = new Date(currentWeek.getTime());
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

  // Calculate the end of the week (Friday)
  const endOfWeek = new Date(startOfWeek.getTime());
  endOfWeek.setDate(endOfWeek.getDate() + 4);

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
