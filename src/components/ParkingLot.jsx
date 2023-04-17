import React from 'react';
import ParkingPlace from './ParkingPlace';
import './ParkingLot.css';

const ParkingLot = () => {
  const parkingPlaces = Array.from({ length: 54 }, (place, i) => i + 1);

  const TopRow = (start, end) => {
    return parkingPlaces.slice(start, end).map((placeNumber) => (
      <ParkingPlace key={placeNumber} number={placeNumber} />
    ));
  };

  const InnerRow1 = (start, end) => {
    return (
      <>
        <div className="blank" />
        <div className="blank" />
        {parkingPlaces.slice(start, end).map((placeNumber) => (
          <ParkingPlace key={placeNumber} number={placeNumber} />
        ))}
        <div className="blank" />
        <div className="blank" />
      </>
    );
  };

  const InnerRow2 = (start, end) => {
    return (
      <>
        <div className="blank" />
        <div className="blank" />
        {parkingPlaces.slice(start, end).map((placeNumber) => (
          <ParkingPlace key={placeNumber} number={placeNumber} />
        ))}
        <div className="blank" />
        <div className="blank" />
      </>
    );
  };

  const BottomRow = (start, end) => {
    return parkingPlaces.slice(start, end).map((placeNumber) => (
      <ParkingPlace key={placeNumber} number={placeNumber} />
    ));
  };

  return (
    <>
      <div className="parking-lot">
        <div className="top-row">{TopRow(0, 16)}</div>
        <div className="separator" />
        <div className="inner-row first">{InnerRow1(16, 27)}</div>
        <div className="inner-row">{InnerRow2(27, 38)}</div>
        <div className="separator" />
        <div className="bottom-row">{BottomRow(38, 54)}</div>
        <p>Click on the parking place to park the car!</p>
     </div>
    </>
  );
};

export default ParkingLot;
