import { getAllTickets } from './getTicket';

const calculatePrice = (barcode) => {
  const tickets = getAllTickets();
  const ticket = tickets.find((t) => t.barcode === barcode);

  if (!ticket) {
    console.error('Ticket not found!');
    return null;
  }

  //calculate time difference 
  const issueTime = new Date(ticket.timestamp);
  const currentTime = new Date();
  
  //time difference in milliseconds converted to hours
  const timeDifferenceInMilliseconds = currentTime - issueTime;
  const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);

  //calculate price 
  const startedHours = Math.ceil(timeDifferenceInHours);
  const price = startedHours * 2;


  return price;
};

export { calculatePrice };
