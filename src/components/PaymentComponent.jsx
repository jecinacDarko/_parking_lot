import React, { useState, useContext, useEffect } from 'react';
import { ParkingServiceContext } from '../App';
import './PaymentComponent.css';

const PaymentComponent = () => {
  const parkingService = useContext(ParkingServiceContext);
  const [unpaidTickets, setUnpaidTickets] = useState([]);
  const [freeSpaces, setFreeSpaces] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedTicketBarcode, setSelectedTicketBarcode] = useState('');

  useEffect(() => {
    // Define a function to update the unpaidTickets state with the current unpaid tickets
    const updateOnParkingSrvcStateChange = () => {
      setUnpaidTickets(parkingService.getUnpaidTickets());
      setFreeSpaces(parkingService.getFreeSpaces());
      const tickets = parkingService.getUnpaidTickets();
      setUnpaidTickets([...tickets]);
    };

    updateOnParkingSrvcStateChange();
    const unsubscribe = parkingService.subscribe(updateOnParkingSrvcStateChange);
    return () => {
      unsubscribe();
    };
  }, [parkingService]);

  const handlePay = () => {
    parkingService.payTicket(selectedTicketBarcode, paymentMethod);
    setSelectedTicketBarcode('');
  };

  return (
    <div className="payment-component">
      <p>Parking Device</p>
      <select className="select"
        value={selectedTicketBarcode} onChange={(e) => setSelectedTicketBarcode(e.target.value)}>
        <option value="">Select a ticket to pay</option>
        {unpaidTickets.map((ticket, index) => (
          <option 
            key={index} 
            value={ticket.barcode}>
            Ticked:{ticket.barcode}
            Price:{parkingService.calculatePrice(ticket.barcode)}$
          </option>
        ))}
      </select>
      <select className="select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="">Choose payment method</option>
        {parkingService.getAvailablePaymentMethods().map((paymentMethod, index) => (
          <option 
            key={index} value={paymentMethod}>
            {paymentMethod}
          </option>
        ))}
      </select>
      <button onClick={handlePay} disabled={!selectedTicketBarcode || !paymentMethod}>Pay Ticket</button>
      <p>Unpaid Tickets: {unpaidTickets.length} </p>
    </div>
  );
};

export default PaymentComponent;
