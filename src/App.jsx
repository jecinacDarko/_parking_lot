import React from 'react';
import ParkingLot from './components/ParkingLot';
import Operations from './components/Operations';
import { createContext } from "react";
import { ParkingService } from "./services/ParkingService";

export const ParkingServiceContext = createContext();

const App = () => {
  const parkingService = ParkingService.shared;
  return (
    <ParkingServiceContext.Provider value={parkingService}>
      <div className="App">
        <ParkingLot />
        <Operations />
      </div>
    </ParkingServiceContext.Provider>
  );
};

export default App;
