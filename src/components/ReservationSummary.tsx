import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReservationData from 'types/ReservationData';

interface ReservationSummaryProps {
  ReservationData: ReservationData | null;
  ShowSummary: boolean;
  SetSummary: (value:boolean) => void;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  ReservationData, ShowSummary, SetSummary
}) => {
  const handleModalClose = () => SetSummary(false);

  return (
    <>
      <Modal show={ShowSummary} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ReservationData?.doctor != null && ReservationData.clinic != null && (
            <>
              <p>Vybrané datum: {ReservationData.date}</p>
              <p>Vybraný čas: {ReservationData.time}</p>
              <p>Jméno: {ReservationData.firstName}</p>
              <p>Příjmení: {ReservationData.lastName}</p>
              <p>Telefon: {ReservationData.phone}</p>
              <p>Email: {ReservationData.email}</p>
              <p>Komentář: {ReservationData.comment}</p>
              <p>
                Vybraný lékař: {ReservationData.doctor.title}
                {ReservationData.doctor.firstName}
                {ReservationData.doctor.lastName}
              </p>
              <p>
                Vybraná klinika: {ReservationData.clinic.name},
                {ReservationData.clinic.location}
              </p>
              <Button
                variant=''
                onClick={() => {
                  alert(
                    'Rezervaci jsem poslal Markovi, snad to dobře dopadne, pokud jo, přijde ti mail a' +
                      ReservationData.date +
                      ' naklusej v ' +
                      ReservationData.time +
                      'do ordinace'
                  );
                }}
              >
                Odeslat
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReservationSummary;
