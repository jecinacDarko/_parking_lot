// Generates a 16-digit barcode
const generateBarcode = () => {
  return Math.random().toString().slice(2, 18);
};

// Returns the timestamp
const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

// Saves ticket to localStorage
const saveTicket = (ticket) => {
  const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
  tickets.push(ticket);
  localStorage.setItem('tickets', JSON.stringify(tickets));
};

// Retrieves tickets from localStorage
const getAllTickets = () => {
  return JSON.parse(localStorage.getItem('tickets')) || [];
};

export {
  generateBarcode,
  getCurrentTimestamp,
  saveTicket,
  getAllTickets,
};
