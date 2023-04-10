// ParkingPlace.js

import React, { useState, useCallback } from 'react';
import './ParkingPlace.css';

const ParkingPlace = ({ number }) => {
  const [isOccupied, setIsOccupied] = useState(false);
  const [bounce, setBounce] = useState(false);

  const handleClick = useCallback(() => {
    setIsOccupied(!isOccupied);
    setBounce(true);
    console.log(` ${isOccupied ? 'Goodbye!' : 'Welcome!'}`);

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
