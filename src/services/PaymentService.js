import { TicketService } from './TicketService.js';
import { Receipt } from '../models/Receipt.js';

export class PaymentService {
  static shared = new PaymentService();
  ticketSrvc = TicketService.shared;
  pricePerHour = 2.0;
  paymentGracePeriodInMinutes = 15

  getTicket(barcode) {
    const tickets = this.ticketSrvc.getAllTickets();
    return tickets.find((ticket) => ticket.barcode === barcode);
  }

  calculatePrice(barcode) {
    const ticket = this.getTicket(barcode);
    if (!ticket) {
      return null;
    }

    let calculationDate = ticket.entryDate;
    let lastReceipt = null;
    if (ticket.receipts.length > 0) {
      lastReceipt = ticket.receipts.pop();
      calculationDate = lastReceipt.paymentDate;
    }

    const timeDifferenceInMilliseconds = Math.max(new Date() - calculationDate, 0);
    const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
    const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);

    if (lastReceipt !== null && timeDifferenceInMinutes < this.paymentGracePeriodInMinutes) {
      return [0, lastReceipt];
    }

    const startedHours = Math.ceil(timeDifferenceInHours);
    const price = startedHours * this.pricePerHour;
    return [price, lastReceipt];
  }

  payTicket(barcode, paymentMethod) {
    const [price, lastReceipt] = this.calculatePrice(barcode);
    const ticket = this.getTicket(barcode);
    if (price === 0) {
      return ticket;
    }
    ticket.receipts.push(
      new Receipt(
        paymentMethod,
        new Date(),
        price
      )
    );
    this.ticketSrvc.saveTicket(ticket);
    return ticket;
  }

  getTicketState(barcode) {
    const result = this.calculatePrice(barcode);
    if (result === null) {
      return null
    }
    let [price, _] = result;
    if (price === 0) {
      return "PAID";
    } else {
      return "UNPAID";
    }
  }

  getPaymentInfo(barcode) {
    const ticket = this.getTicket(barcode);
    if (ticket && ticket.receipts.length > 0) {
      const lastReceipt = ticket.receipts[ticket.receipts.length - 1];
      return {
        paymentMethod: lastReceipt.paymentMethod,
        paidAmount: lastReceipt.amount,
      };
    }
    return null;
  }

  getAvailablePaymentMethods() {
    return ['CASH', 'Credit Card', 'Debit Card'];
  }
}

window.paymentService = PaymentService.shared;
