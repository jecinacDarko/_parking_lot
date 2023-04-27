import { Ticket } from "../models/Ticket.js";
import { TicketService } from "./TicketService.js";
import { PaymentService } from "./PaymentService.js";

export class ParkingService {
  static shared = new ParkingService();

  ticketSrvc = TicketService.shared;
  paymentSrvc = PaymentService.shared;
  maxParkingSpots = 54;

  getTicket = (parkingSpot) => {
    const tickets = this.ticketSrvc.getAllTickets;
    const currentlyTakenParkingSpots = tickets.length;
    if (currentlyTakenParkingSpots >= this.maxParkingSpots) return null;
    const ticket = new Ticket(this.ticketSrvc.generateBarcode());
    ticket.entryDate = new Date();
    ticket.parkingSpot = parkingSpot;
    this.ticketSrvc.saveTicket(ticket);
    this.triggerListeners();
    return ticket;
  };

	scanTicket = (barcode) => {
    const ticket = this.ticketSrvc.getAllTickets().find((t) => t.barcode === barcode);
    if (!ticket || this.getTicketState(ticket.barcode) === "UNPAID") throw new Error("Ticket not paid.");
    this.ticketSrvc.deleteTicket(ticket.barcode);
    this.triggerListeners();
    return null;
	};

  fetchTicketByParkingSpot = (parkingSpot) => {
    const tickets = this.ticketSrvc.getAllTickets();
    return tickets.find((ticket) => ticket.parkingSpot === parkingSpot) || null;
  };

  calculatePrice = (barcode) => this.paymentSrvc.calculatePrice(barcode);

	payTicket = (barcode, paymentMethod) => {
    const ticket = this.paymentSrvc.payTicket(barcode, paymentMethod);
    this.triggerListeners();
    return ticket;
  };

	getTicketState = (barcode) => this.paymentSrvc.getTicketState(barcode);
	getFreeSpaces = () => this.maxParkingSpots - this.ticketSrvc.getAllTickets().length;
  getAvailablePaymentMethods = () => this.paymentSrvc.getAvailablePaymentMethods();


  getUnpaidTickets = () => {
    const tickets = this.ticketSrvc.getAllTickets();
    return tickets.filter((ticket) => this.getTicketState(ticket.barcode) === "UNPAID");
  };

  getTicketForParkingSpot = (number) =>
    this.ticketSrvc.getAllTickets().find((ticket) => ticket.parkingSpot === number) || null;

		
  // Subscribe to parking service events
  subscribe = (listener) => {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  };

  triggerListeners = () => this.listeners.forEach((listener) => listener());

  listeners = [];
}
