import { TicketService } from "./TicketService.js";
import { Receipt } from "../models/Receipt.js";

export class PaymentService {
  static shared = new PaymentService()

  ticketSrvc = TicketService.shared

  pricePerHour = 2.0

  // TASK 2
  calculatePrice(barcode) {
    const ticket = this.ticketSrvc.getTicket(barcode);

    if (!ticket) {
      console.error('Ticket not found!');
      return -1;
    }

    // calculate time difference 
    let calculationDate = ticket.entryDate

    let lastReceipt = null
    if (ticket.receipts.length > 0) {
      lastReceipt = ticket.receipts.pop()
      calculationDate = lastReceipt.paymentDate
    }

    //time difference in milliseconds converted to hours
    const timeDifferenceInMilliseconds = Math.max(new Date() - calculationDate, 0);
    const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
    const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);

    if (lastReceipt !== null && timeDifferenceInMinutes < 15) {
      return [0, lastReceipt]
    }

    // calculate price 
    const startedHours = Math.ceil(timeDifferenceInHours);
    const price = startedHours * this.pricePerHour;

    return [price, lastReceipt];
  }

  payTicket(barcode, paymentMethod) {
    const [price, lastReceipt] = this.calculatePrice(barcode)
    const ticket = this.ticketSrvc.getTicket(barcode)
    if (price === 0 || lastReceipt !== null) {
      return ticket
    }

    ticket.receipts.push(
      new Receipt(
        paymentMethod, 
        new Date(), 
        price
      )
    )

    this.ticketSrvc.saveTicket(ticket);
    return ticket;
  }

  getAvailablePaymentMethods() {
    return ["CASH", "Credit Card", "Debit Card"]
  }

  getTicketState(barcode) {
    let [price, receipt] = this.calculatePrice(barcode)
    if (receipt) {
      return 'PAID'
    } else {
      return 'UNPAID'
    }
  }
}
