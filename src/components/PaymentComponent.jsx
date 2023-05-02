import React, { useState, useContext, useEffect } from 'react';
import { ParkingServiceContext } from '../App';
import './PaymentComponent.css';

const PaymentComponent = () => {
  const parkingService = useContext(ParkingServiceContext);
  const [unpaidTickets, setUnpaidTickets] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedTicketBarcode, setSelectedTicketBarcode] = useState('');

  useEffect(() => {
    const updateOnParkingSrvcStateChange = () => {
      const tickets = parkingService.getUnpaidTickets();
      setUnpaidTickets(tickets);
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
      <p>Parking Machine</p>
      <select className="select"
        value={selectedTicketBarcode} onChange={(e) => setSelectedTicketBarcode(e.target.value)}>
        <option value="">Select a ticket to pay</option>
        {unpaidTickets.map((ticket, index) => (
          <option 
            key={index} 
            value={ticket.barcode}>
            Spot: {ticket.parkingSpot} Price: ${parkingService.calculatePrice(ticket.barcode)[0]}
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
