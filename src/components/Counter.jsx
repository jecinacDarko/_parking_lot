import React, { useState, useContext, useEffect } from 'react';
import './Counter.css';
import { ParkingServiceContext } from '../App.jsx';

const Counter = () => {
  const parkingService = useContext(ParkingServiceContext);
  const [freeSpaces, setFreeSpaces] = useState(0);

  useEffect(() => {
    const updateFreeSpaces = () => {
      setFreeSpaces(parkingService.getFreeSpaces());
    };
    updateFreeSpaces();
    const unsubscribe = parkingService.subscribe(updateFreeSpaces);
    return () => {
      unsubscribe();
    };
  }, [parkingService]);

  return (
    <div className='counter'>
      <h1>Free Spaces </h1> 
      <div className="counter-numbers">
        {freeSpaces}
      </div>
    </div>
  );
};

export default Counter;
