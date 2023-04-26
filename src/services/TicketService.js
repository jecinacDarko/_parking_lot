export class TicketService {
  static shared = new TicketService()

  // Generates a 16-digit barcode
  generateBarcode() {
    return Math.random().toString().slice(2, 18);
  }

  // Retrieves tickets from localStorage
  getAllTickets() {
    return Object.entries(localStorage).map(([key, value]) => {
      return JSON.parse(value, this.parseDateReviver)
    })
  }

  // Retrieves ticket by barcode
  getTicket(barcode) {
    return JSON.parse(localStorage.getItem(barcode), this.parseDateReviver) || null;
  }

  // Saves ticket to localStorage
  saveTicket(ticket) {
    localStorage.setItem(ticket.barcode, JSON.stringify(ticket));
  }

  // Deletes ticket from localStorage
  deleteTicket(barcode) {
    localStorage.removeItem(barcode)
  }

  parseDateReviver(key, value) {
    if (typeof value === 'string') {
      const date = Date.parse(value);
      if (!isNaN(date)) {
        return new Date(date);
      }
    }
    return value;
  }
}