import React, { useState, useCallback } from 'react';
import './ParkingPlace.css';
import { generateBarcode, getCurrentTimestamp, saveTicket } from '../utils/getTicket';

const ParkingPlace = ({ number }) => {
  const [isOccupied, setIsOccupied] = useState(false);
  const [bounce, setBounce] = useState(false);

  const handleClick = useCallback(() => {
    const newIsOccupied = !isOccupied;
    setIsOccupied(newIsOccupied);
    setBounce(true);

    if (!newIsOccupied) {
      console.log('Goodbye!');
    } else {
      const barcode = generateBarcode();
      const timestamp = getCurrentTimestamp();
      const ticket = { number, barcode, timestamp };
      saveTicket(ticket);
      console.log(`Welcome! Your ticket barcode is: ${barcode}`);
    }

    setTimeout(() => {
      setBounce(false);
    }, 300);
  }, [isOccupied, number]);

  return (
    <div
      className={`parking-place${isOccupied ? ' occupied' : ''}${bounce ? ' bounce' : ''}`}
      onClick={handleClick}
    >
      {number}
    </div>
  );
};

export default ParkingPlace;
