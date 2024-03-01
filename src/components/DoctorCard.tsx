import React, { useState } from 'react';
import { Card, CardGroup, ListGroup, Spinner } from 'react-bootstrap';
import Doctor from 'types/DoctorType';
import '../styles/DoctorCard.css';

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <CardGroup>
        <Card className='card'>
          {!imageLoaded && <Spinner />}
          <Card.Img
            variant='top'
            src={`/assets/doctorPics/${doctor.pictureId}.png`}
            alt={`Doctor ${doctor.firstName + doctor.lastName}`}
            className={`card-img ${imageLoaded ? '' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </Card>
        <Card className='card'>
          <Card.Body>
            <Card.Title>
              {doctor.title} {doctor.firstName} {doctor.lastName}
            </Card.Title>
            <Card.Text className='card-text'>{doctor.description}</Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <CardGroup>
        <Card className='card'>
          <ListGroup variant='flush' className='list-group'>
            {doctor.points.map((point, index) => (
              <ListGroup.Item key={index} className='list-group-item'>
                {point}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </CardGroup>
    </>
  );
};

export default DoctorCard;
