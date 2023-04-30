import { Ticket } from '../models/Ticket.js';
import { TicketService } from './TicketService.js';
import { PaymentService } from './PaymentService.js';

export class ParkingService {
  static shared = new ParkingService();
  ticketSrvc = TicketService.shared;
  paymentSrvc = PaymentService.shared;
  maxParkingSpots = 54;

  getTicket(parkingSpot) {
    const tickets = this.ticketSrvc.getAllTickets();
    const openTickets = tickets.filter((ticket) => ticket.exitDate === null);
    if (openTickets.length >= this.maxParkingSpots) {
      return null;
    }

    const newBarcode = this.ticketSrvc.generateBarcode();
    const ticket = new Ticket(newBarcode);
    ticket.entryDate = new Date();
    ticket.parkingSpot = parkingSpot;
    this.ticketSrvc.saveTicket(ticket);
    this.triggerListeners();
    return ticket;
  }

  scanTicket(barcode) {
    const tickets = this.ticketSrvc.getAllTickets();
    const ticket = tickets.find((ticket) => ticket.barcode === barcode) || null;

    if (this.getTicketState(ticket.barcode) === 'UNPAID') {
      throw new Error('You cannot exit. You must pay the ticket first.');
    }
    ticket.exitDate = new Date();
    this.ticketSrvc.deleteTicket(ticket.barcode);
    this.triggerListeners();
    return null;
  }

  calculatePrice(barcode) {
    return this.paymentSrvc.calculatePrice(barcode);
  }

  payTicket(barcode, paymentMethod) {
    const ticket = this.paymentSrvc.payTicket(barcode, paymentMethod);
    this.triggerListeners();
    return ticket;
  }

  getTicketState(barcode) {
    return this.paymentSrvc.getTicketState(barcode);
  }

  getFreeSpaces() {
    return this.maxParkingSpots - this.ticketSrvc.getAllTickets().length;
  }

  getUnpaidTickets() {
    const tickets = this.ticketSrvc.getAllTickets();
    return tickets.filter((ticket) => this.getTicketState(ticket.barcode) === 'UNPAID');
  }

  getTicketForParkingSpot(number) {
    const tickets = this.ticketSrvc.getAllTickets();
    return tickets.find((ticket) => ticket.parkingSpot === number) || null;
  }

  getAvailablePaymentMethods() {
    return this.paymentSrvc.getAvailablePaymentMethods();
  }

  getPaymentInfo(barcode) {
    return this.paymentSrvc.getPaymentInfo(barcode);
  }

  // PUBSUB
  listeners = [];

  subscribe(listener) {
    this.listeners.push(listener);

  // Return a function that removes the listener from the list when called
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // Method that triggers the listeners when there is a change
  triggerListeners() {
    this.listeners.forEach((listener) => listener());
  }
}
