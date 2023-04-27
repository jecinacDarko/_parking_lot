import React, { useState, useContext, useEffect } from 'react';
import { ParkingServiceContext } from '../App';

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
    <div>
      <h2>Payment Component</h2>
      <select value={selectedTicketBarcode} onChange={(e) => setSelectedTicketBarcode(e.target.value)}>
        <option value="">Select a ticket to pay</option>
        {unpaidTickets.map((ticket, index) => (
          <option key={index} value={ticket.barcode}>
            {ticket.barcode} {parkingService.calculatePrice(ticket.barcode)}
          </option>
        ))}
      </select>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="">Choose payment method</option>
        {parkingService.getAvailablePaymentMethods().map((paymentMethod, index) => (
          <option key={index} value={paymentMethod}>
            {paymentMethod}
          </option>
        ))}
      </select>
      <button onClick={handlePay} disabled={!selectedTicketBarcode || !paymentMethod}>Pay Ticket</button>
      <h3>Unpaid Tickets {unpaidTickets.length} Free Spaces: {freeSpaces} </h3>
      <div>
        {unpaidTickets.map((ticket, index) => (
          <div key={index}>
            Barcode: {ticket.barcode} - price:
            {parkingService.calculatePrice(ticket.barcode)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentComponent;
