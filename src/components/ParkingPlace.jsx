import React, { useState, useCallback } from 'react';
import { generateBarcode, getCurrentTimestamp, saveTicket } from '../utils/getTicket';
import { calculatePrice } from '../utils/calculatePrice';
import './ParkingPlace.css';

const ParkingPlace = ({ number }) => {
  const [occupied, setOccupied] = useState(false);
  const [bounce, setBounce] = useState(false);
  const [barcode, setBarcode] = useState(null);

  const handleClick = useCallback(() => {
    const emptyPlace = !occupied;
    setOccupied(emptyPlace);
    setBounce(true);

    if (!emptyPlace) {
      const price = calculatePrice(barcode);
      console.log(`Goodbye! Your parking fee is: €${price}`);
      setBarcode(null);
    } else {
      const newBarcode = generateBarcode();
      const timestamp = getCurrentTimestamp();
      const ticket = { number, barcode: newBarcode, timestamp };
      saveTicket(ticket);
      console.log(`Welcome! Your ticket barcode is: ${newBarcode}`);
      setBarcode(newBarcode);
    }

    setTimeout(() => {
      setBounce(false);
    }, 300);
  }, [occupied, number, barcode]);

  return (
    <div
      className={`parking-place${occupied ? ' occupied' : ''}${bounce ? ' bounce' : ''}`}
      onClick={handleClick}
    >
      {number}
    </div>
  );
};

export default ParkingPlace;
