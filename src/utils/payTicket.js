import { getAllTickets, saveTicket } from './getTicket';
import { calculatePrice } from './calculatePrice';

const payTicket = (barcode, paymentMethod) => {
  const tickets = getAllTickets();
  const ticket = tickets.find((t) => t.barcode === barcode);

  if (!ticket) {
    console.error('Ticket not found!');
    return null;
  }

  if (ticket.isPaid) {
    console.error('Ticket is already paid!');
    return null;
  }

  ticket.isPaid = true;
  ticket.paymentMethod = paymentMethod;
  ticket.paymentTimestamp = new Date().toISOString();

  saveTicket(ticket);

  const price = calculatePrice(barcode);
  const receipt = {
    ticketBarcode: barcode,
    paymentMethod: paymentMethod,
    paymentTimestamp: ticket.paymentTimestamp,
    price: price,
  };

  return receipt;
};

export { payTicket };
