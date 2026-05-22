export interface FlickModel {
  id: number
  genre: string
  title: string
  image: string
  url: string
  description: string
  ticketPrice: number
  availableTickets: number
  isFavorite: boolean
  details: {
    title: string
    body: string
  }[]
}

export interface DetailItem {
  title: string;
  body: string;
}

export interface CartItem {
  flick: FlickModel;
  quantity: number;
  subtotal: number;
}

export interface SaleHistory {
  id: string;
  date: Date;
  items: CartItem[];
  totalAmount: number;
  paymentMethod?: string;
}
