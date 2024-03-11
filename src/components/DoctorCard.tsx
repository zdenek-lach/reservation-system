import React, { useState } from 'react';
import { Card, CardGroup, ListGroup, Spinner } from 'react-bootstrap';
import Doctor from 'types/DoctorType';

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <CardGroup>
        <Card style={{ width: '18rem' }}>
          {!imageLoaded && <Spinner />}
          <Card.Img
            variant="top"
            src={`/assets/doctorPics/${doctor.pictureId}.jpg`}
            alt={`Doctor ${doctor.firstName + doctor.lastName}`}
            style={{
              width: '80%',
              borderRadius: '0.5rem',
              margin: '20px auto',
              padding: '10px',
              display: imageLoaded ? 'block' : 'none',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>
              {doctor.title} {doctor.firstName} {doctor.lastName}
            </Card.Title>
            <Card.Text style={{ color: '#6c757d', lineHeight: '1.6' }}>
              {doctor.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <CardGroup>
        <Card style={{ width: '18rem' }}>
          <ListGroup
            variant="flush"
            style={{ margin: '0 20px', borderRadius: '0.5rem' }}
          >
            {doctor.points.map((point, index) => (
              <ListGroup.Item
                key={index}
                style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '0.25rem',
                  marginBottom: '0.5rem',
                }}
              >
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
