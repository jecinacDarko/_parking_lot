import React, { useState, useCallback } from 'react';
import './ParkingPlace.css';

const ParkingPlace = ({ number }) => {
  const [isOccupied, setIsOccupied] = useState(false);
  const [bounce, setBounce] = useState(false);

  const handleClick = useCallback(() => {
    const newIsOccupied = !isOccupied;
    setIsOccupied(newIsOccupied);
    setBounce(true);
    console.log(`${newIsOccupied ? 'Welcome!' : 'Goodbye!'}`);

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
