export interface ShowSchedule {
  id: number;
  showId: number;
  scheduleDateTime: string;
  availableTickets: number;
  totalTickets: number;
  isActive?: number;
}

export interface FlickModel {
  id: number;
  genre: string;
  title: string;
  image: string;
  url: string;
  description: string;
  ticketPrice: number;
  duration: number;
  isFavorite?: boolean;
  schedules?: ShowSchedule[];
  details: {
    title: string;
    body: string;
  }[];
}

export interface DetailItem {
  title: string;
  body: string;
}

export interface CartItem {
  flick: FlickModel;
  scheduleId: number;
  scheduleDateTime: string;
  quantity: number;
  subtotal: number;
}

export interface SaleHistory {
  id: string;
  userId: number;
  showTitle: string;
  quantity: number;
  totalAmount: number;
  scheduleDateTime: string;
  saleDate: string;
  paymentMethod: string;
}
