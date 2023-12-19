import {
  Box,
  Card,
  CardBody,
  Flex,
  Image,
  ListItem,
  Spinner,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Doctor from 'types/DoctorType';

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card borderWidth={1} borderRadius="lg" overflow="hidden">
      <Flex direction={['column', 'row']}>
        <Box flex="1">
          {!imageLoaded && <Spinner />}
          <Image
            src={`/assets/doctorPics/${doctor.pictureId}.jpg`}
            alt={`Doctor ${doctor.firstName + doctor.lastName}`}
            w="100%"
            borderRadius="lg"
            m="20px"
            p="10px"
            onLoad={() => setImageLoaded(true)}
            style={imageLoaded ? {} : { display: 'none' }}
          />
        </Box>
        <Box p={6} flex="1">
          <Stack spacing={0} align={'start'} mb={5}>
            <Text
              fontSize={'2xl'}
              fontWeight={500}
              fontFamily={'body'}
              color={'gray.800'}
            >
              {doctor.title} {doctor.firstName} {doctor.lastName}
            </Text>
            <Text color={'gray.500'}>{doctor.description}</Text>
          </Stack>
        </Box>
      </Flex>
      <CardBody>
        <Box p={6} flex="1">
          <UnorderedList>
            {doctor.points.map((point, index) => (
              <ListItem key={index}>{point}</ListItem>
            ))}
          </UnorderedList>
        </Box>
      </CardBody>
    </Card>
  );
};

export default DoctorCard;
