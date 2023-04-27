import React, { useState, useContext, useCallback } from 'react';
import { ParkingServiceContext } from "../App.jsx";
import './ParkingSpot.css';

const ParkingSpot = ({ number }) => {

  const parkingService = useContext(ParkingServiceContext);
  const [ticket, setTicket] = useState(parkingService.getTicketForParkingSpot(number));
  const [bounce, setBounce] = useState(false);

  const handleClick = useCallback(() => {
    setBounce(true);
    setTicket(
      ticket === null
        ? parkingService.getTicket(number)
        : parkingService.getTicketState(ticket.barcode) === 'UNPAID'
        ? (alert('You must pay to exit'), ticket)
        : parkingService.scanTicket(ticket.barcode)
    );
  });
  
  return (
    <div
      className={`parking-spot${ticket !== null ? ' occupied' : ''}${bounce ? ' bounce' : ''}`}
      onClick={handleClick}
    >
      {ticket !== null && ticket.barcode !== null && (
        <div className="barcode-container">
          {ticket.barcode}
        </div>
      )}
      {ticket === null && <div className="parking-spot-number">{number}</div>}
    </div>
  );
}    

export default ParkingSpot;
