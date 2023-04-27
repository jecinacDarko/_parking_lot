import { TicketService } from './TicketService.js';
import { Receipt } from '../models/Receipt.js';

export class PaymentService {
  static shared = new PaymentService();
  ticketSrvc = TicketService.shared;
  pricePerHour = 2.0;

  calculatePrice(barcode) {
    const ticket = this.ticketSrvc.getTicket(barcode);
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

    if (lastReceipt !== null && timeDifferenceInMinutes < 15) {
      return [0, lastReceipt];
    }

    const startedHours = Math.ceil(timeDifferenceInHours);
    const price = startedHours * this.pricePerHour;
    return [price, lastReceipt];
  }

  payTicket(barcode, paymentMethod) {
    const [price, lastReceipt] = this.calculatePrice(barcode);
    const ticket = this.ticketSrvc.getTicket(barcode);
    if (price === 0 || lastReceipt !== null) {
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
    if (result !== null) {
      let [price, receipt] = result;
      if (receipt) {
        return "PAID";
      } else {
        return "UNPAID";
      }
    } else {
      return null;
    }
  }

  getAvailablePaymentMethods() {
    return ['CASH', 'Credit Card', 'Debit Card'];
  }
}
