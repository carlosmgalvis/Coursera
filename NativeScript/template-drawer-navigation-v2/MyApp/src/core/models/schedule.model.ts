export interface ShowSchedule {
  id: number;
  showId: number;
  scheduleDateTime: string;
  availableTickets: number;
  totalTickets: number;
}

export interface TicketOrder {
  scheduleId: number;
  showId: number;
  showTitle: string;
  scheduleDateTime: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentMethod: string;
}

export interface Sale {
  id: string;
  showTitle: string;
  quantity: number;
  totalAmount: number;
  scheduleDateTime: string;
  saleDate: string;
  paymentMethod: string;
}