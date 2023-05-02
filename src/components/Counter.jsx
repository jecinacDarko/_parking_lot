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
      <p>Available Spots: </p> 
        {freeSpaces}
    </div>
  );
};

export default Counter;
