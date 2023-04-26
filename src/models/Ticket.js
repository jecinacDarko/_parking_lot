export class Ticket {
  constructor(barcode) {
    this.barcode = barcode
    this.entryDate = null
    this.receipts = []
    this.parkingSpot = 0
  }
}