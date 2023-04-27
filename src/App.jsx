import React from 'react';
import ParkingLot from './components/ParkingLot';
import PaymentComponent from './components/PaymentComponent';
import { createContext } from "react";
import { ParkingService } from "./services/ParkingService";

export const ParkingServiceContext = createContext();
export const TicketServiceContext = createContext();

const App = () => {
  const parkingService = ParkingService.shared;

  return (
    <ParkingServiceContext.Provider value={parkingService}>
        <div className="App">
          <ParkingLot />
          <PaymentComponent />
        </div>
    </ParkingServiceContext.Provider>
  );
};

export default App;
