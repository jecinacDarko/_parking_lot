import React from 'react';
import ParkingSpot from './ParkingSpot';
import PaymentComponent from './PaymentComponent';
import Counter from './Counter';
import './ParkingLot.css';

const ParkingLot = () => {
  const parkingSpots = Array.from({ length: 54 }, (place, i) => i + 1);

  const TopRow = (start, end) => {
    return parkingSpots.slice(start, end).map((spotNumber) => (
      <ParkingSpot key={spotNumber} number={spotNumber} />
    ));
  };

  const InnerRow1 = (start, end) => {
    return (
      <>
        <div className='blank-top' />
        <div className='blank' />
        {parkingSpots.slice(start, end).map((spotNumber) => (
          <ParkingSpot key={spotNumber} number={spotNumber} />
        ))}
        <PaymentComponent />
      </>
    );
  };

  const InnerRow2 = (start, end) => {
    return (
      <>
        <div className='blank' />
        <div className='blank' />
        {parkingSpots.slice(start, end).map((spotNumber) => (
          <ParkingSpot key={spotNumber} number={spotNumber} />
        ))}
        <Counter />
      </>
    );
  };

  const BottomRow = (start, end) => {
    return parkingSpots.slice(start, end).map((spotNumber) => (
      <ParkingSpot key={spotNumber} number={spotNumber} />
    ));
  };

  return (
    <>
      <div className='parking-lot'>
        <div className='top-row'>{TopRow(0, 16)}</div>
        <div className='separator' />
        <div className='inner-row'>{InnerRow1(16, 27)}</div>
        <div className='inner-row'>{InnerRow2(27, 38)}</div>
        <div className='separator' />
        <div className='bottom-row'>{BottomRow(38, 54)}</div>
     </div>
    </>
  );
};

export default ParkingLot;
