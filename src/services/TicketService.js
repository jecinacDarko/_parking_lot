export class TicketService {
  static shared = new TicketService();

  generateBarcode() {
    return Math.random().toString().slice(2, 18);
  }

  getAllTickets() {
    return Object.entries(localStorage).map(([key, value]) => {
      return JSON.parse(value, this.parseDateReviver);
    });
  }

  getTicket(barcode) {
    return JSON.parse(localStorage.getItem(barcode), this.parseDateReviver) || null;
  }

  saveTicket(ticket) {
    localStorage.setItem(ticket.barcode, JSON.stringify(ticket));
  }

  deleteTicket(barcode) {
    localStorage.removeItem(barcode);
  }

  // Date parser function
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
