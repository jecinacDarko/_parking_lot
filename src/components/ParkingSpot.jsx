import React, { useState, useContext, useCallback } from 'react';
import './ParkingSpot.css';
import { ParkingServiceContext } from "../App.jsx";


const ParkingSpot = ({ number }) => {
  const parkingService = useContext(ParkingServiceContext);
  const [ticket, setTicket] = useState(parkingService.fetchTicketByParkingSpot(number));
  const [bounce, setBounce] = useState(false);

  const handleClick = useCallback(() => {
    setBounce(true);

    if (ticket === null) {
      setTicket(parkingService.getTicket(number))
    } else {
      setTicket(null)
    }
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
