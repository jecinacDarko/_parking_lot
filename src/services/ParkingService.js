import { Ticket } from "../models/Ticket.js";
import { TicketService } from "./TicketService.js";
import { PaymentService } from "./PaymentService.js";

export class ParkingService {
  static shared = new ParkingService();
  ticketSrvc = TicketService.shared;
  paymentSrvc = PaymentService.shared;

  maxParkingSpots = 54;

  getTicket(parkingSpot) {
    const tickets = this.ticketSrvc.getAllTickets;
    const currentlyTakenParkingSpots = tickets.length;

    if (currentlyTakenParkingSpots >= this.maxParkingSpots) {
      // Max spots reached
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

  fetchTicketByParkingSpot(parkingSpot) {
    const tickets = this.ticketSrvc.getAllTickets();
    return tickets.find((ticket) => ticket.parkingSpot === parkingSpot) || null;
  }

  calculatePrice(barcode) {
    return this.paymentSrvc.calculatePrice(barcode);
  }

  getAvailablePaymentMethods() {
    return this.paymentSrvc.getAvailablePaymentMethods();
  }

  getUnpaidTickets() {
    const tickets = this.ticketSrvc.getAllTickets();
    return tickets.filter((ticket) => ticket.receipts.length === 0);
  }

  payTicket(barcode, paymentMethod) {
    const ticket = this.paymentSrvc.payTicket(barcode, paymentMethod);
    this.triggerListeners();
    return ticket;
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
