import React, { useState, useContext, useCallback, useEffect } from 'react';
import { ParkingServiceContext } from '../App.jsx';
import './ParkingSpot.css';

const ParkingSpot = ({ number }) => {
  const parkingService = useContext(ParkingServiceContext);

  const [ticket, setTicket] = useState(parkingService.getTicketForParkingSpot(number));
  const [ticketState, setTicketState] = useState(parkingService.getTicketState(ticket?.barcode));
  const [bounce, setBounce] = useState(false);
  const paymentInfo = ticket?.receipts?.length > 0 ? ticket.receipts[ticket.receipts.length - 1] : null;

  useEffect(() => {
    const updateOnParkingSrvcStateChange = () => {
      const currentTicket = parkingService.getTicketForParkingSpot(number);
      setTicket(currentTicket);
      if (currentTicket) {
        setTicketState(parkingService.getTicketState(currentTicket.barcode));
      }
    };

    updateOnParkingSrvcStateChange();
    const unsubscribe = parkingService.subscribe(updateOnParkingSrvcStateChange);
    return () => {
      unsubscribe();
    };
  }, [number, parkingService]);

  const handleBounce = () => setBounce(true);

  const handleTicketCreation = () => {
    !ticket && setTicket(parkingService.getTicket(number));
  };

  const handleTicketScan = () => {
    const ticketState = parkingService.getTicketState(ticket.barcode);
    ticketState === 'UNPAID'
      ? alert('You must pay to exit')
      : setTicket(parkingService.scanTicket(ticket.barcode));
  };

  const handleClick = useCallback(() => {
    handleBounce();
    handleTicketCreation();
    ticket && handleTicketScan();
  });


  const parkingSpotClass = () => {
    if (ticket === null) return 'parking-spot';
    if (ticketState === 'PAID') return 'parking-spot paid';
    return 'parking-spot occupied';
  };

  return (
    <div className={`${parkingSpotClass()}${bounce ? ' bounce' : ''}`} onClick={handleClick}>
      {ticket !== null && ticket.barcode !== null ? (
        <div className='text-container'>
          <h2>Place no: {number}</h2>
          <p>Ticket id: </p>
          <span style={{ fontSize: '8px', width: '100%' }}>{ticket.barcode}</span>
          {ticketState === 'UNPAID' ? (
            <p>Parking started at: {ticket.entryDate.toLocaleString()}</p>
          ) : (
            <>
              <p>Current price: 0</p>
              <p>Payment method: {paymentInfo?.paymentMethod}</p>
            </>
          )}
          <p>Status: {ticketState}</p>
        </div>
      ) : (
        <div className='parking-spot-number'>{number}</div>
      )}
    </div>
  );
};

export default ParkingSpot;
