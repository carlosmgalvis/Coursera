import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, FlickModel, SaleHistory } from '../models/flick.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private salesHistorySubject = new BehaviorSubject<SaleHistory[]>([]);

  private readonly STORAGE_KEY = 'sales_history';

  constructor(private storageService: StorageService) {
    this.loadSalesHistory();
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(flick: FlickModel, quantity: number = 1): boolean {
    if (quantity > flick.availableTickets) {
      return false;
    }

    const existingItem = this.cartItems.find(item => item.flick.id === flick.id);

    if (existingItem) {
      if (existingItem.quantity + quantity > flick.availableTickets) {
        return false;
      }
      existingItem.quantity += quantity;
      existingItem.subtotal = existingItem.quantity * flick.ticketPrice;
    } else {
      this.cartItems.push({
        flick: flick,
        quantity: quantity,
        subtotal: quantity * flick.ticketPrice
      });
    }

    this.cartSubject.next([...this.cartItems]);
    return true;
  }

  updateQuantity(flickId: number, quantity: number): boolean {
    const item = this.cartItems.find(item => item.flick.id === flickId);

    if (item) {
      if (quantity > item.flick.availableTickets) {
        return false;
      }

      if (quantity <= 0) {
        this.removeFromCart(flickId);
        return true;
      }

      item.quantity = quantity;
      item.subtotal = quantity * item.flick.ticketPrice;
      this.cartSubject.next([...this.cartItems]);
      return true;
    }
    return false;
  }

  removeFromCart(flickId: number): void {
    this.cartItems = this.cartItems.filter(item => item.flick.id !== flickId);
    this.cartSubject.next([...this.cartItems]);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.subtotal, 0);
  }

  checkout(paymentMethod: string = 'Credit Card'): SaleHistory | null {
    if (this.cartItems.length === 0) {
      return null;
    }

    for (const item of this.cartItems) {
      if (item.quantity > item.flick.availableTickets) {
        return null;
      }
    }

    // Update available tickets
    for (const item of this.cartItems) {
      item.flick.availableTickets -= item.quantity;
    }

    const sale: SaleHistory = {
      id: this.generateSaleId(),
      date: new Date(),
      items: [...this.cartItems],
      totalAmount: this.getTotalPrice(),
      paymentMethod: paymentMethod
    };

    this.saveSaleToHistory(sale);
    this.clearCart();

    return sale;
  }

  private generateSaleId(): string {
    return 'SALE_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private saveSaleToHistory(sale: SaleHistory): void {
    const currentHistory = this.getSalesHistory();
    currentHistory.unshift(sale);

    // Save using storage service
    this.storageService.setItem(this.STORAGE_KEY, currentHistory);
    this.salesHistorySubject.next(currentHistory);
  }

  loadSalesHistory(): void {
    const history = this.storageService.getItem<SaleHistory[]>(this.STORAGE_KEY) || [];
    this.salesHistorySubject.next(history);
  }

  getSalesHistory(): SaleHistory[] {
    return this.storageService.getItem<SaleHistory[]>(this.STORAGE_KEY) || [];
  }

  getSalesHistoryObservable(): Observable<SaleHistory[]> {
    return this.salesHistorySubject.asObservable();
  }

  clearSalesHistory(): void {
    this.storageService.removeItem(this.STORAGE_KEY);
    this.salesHistorySubject.next([]);
  }

  getTotalSales(): number {
    const history = this.getSalesHistory();
    return history.reduce((total, sale) => total + sale.totalAmount, 0);
  }
}
