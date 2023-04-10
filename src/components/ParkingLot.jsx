import React from 'react';
import ParkingPlace from './ParkingPlace';
import './ParkingLot.css';

const ParkingLot = () => {
  const isValidPlace = (row, col) => {
    return !(
      row === 2 ||
      row === 5 ||
      (row === 3 && (col <= 2 || col >= 14)) ||
      (row === 4 && (col <= 2 || col >= 14))
    );
  };

  const gridItems = Array.from({ length: 6 * 16 }, (_, index) => {
    const row = Math.floor(index / 16) + 1;
    const col = (index % 16) + 1;

    if (isValidPlace(row, col)) {
      const placeNumber = (row - 1) * 16 + col - (row > 2 && row < 5 ? 2 : 0);
      return (
        <div
          className="parking-place-wrapper"
          key={`${row}-${col}`}
          style={{
            gridColumn: col,
            gridRow: row,
          }}
        >
          <ParkingPlace number={placeNumber} />
        </div>
      );
    }

    return null;
  }).filter(Boolean);

  return <div className="parking-lot">{gridItems}</div>;
};

export default ParkingLot;
