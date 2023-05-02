import React, { useState, useContext, useCallback, useEffect } from 'react';
import { ParkingServiceContext } from '../App.jsx';
import './ParkingSpot.css';

const ParkingSpot = ({ number }) => {
  const parkingService = useContext(ParkingServiceContext);

  const [ticket, setTicket] = useState(parkingService.getTicketForParkingSpot(number));
  const [ticketState, setTicketState] = useState('UNPAID');
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
    !ticket && setTicketState('UNPAID');
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
          <h2>Spot {number}</h2>
          Ticket barcode: {ticket.barcode}
          <h1>${parkingService.calculatePrice(ticket.barcode)[0]}</h1>
          {ticketState === 'UNPAID' ? (
            <p>
              Unpaid ticket
            </p>
          ) : (
              <p> Payment method: {paymentInfo?.paymentMethod} </p>
          )}
        </div>
      ) : (
        <div className='parking-spot-number'>{number}</div>
      )}
    </div>
  );
};

export default ParkingSpot;
