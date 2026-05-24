import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, FlickModel } from '../models/flick.model';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { NetworkService } from './network.service';
import { alert } from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
    private networkService: NetworkService
  ) {
    this.loadCart();
  }

  private async loadCart(): Promise<void> {
    const savedCart = await this.storageService.getOfflineData('cart');
    if (savedCart) {
      this.cartItems = savedCart;
      this.cartSubject.next([...this.cartItems]);
    }
  }

  private async saveCart(): Promise<void> {
    await this.storageService.storeOfflineData('cart', this.cartItems);
  }

  getCart() {
    return this.cartSubject.asObservable();
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(flick: FlickModel, scheduleId: number, scheduleDateTime: string, quantity: number = 1): boolean {
    const schedule = flick.schedules?.find(s => s.id === scheduleId);
    if (!schedule || quantity > schedule.availableTickets) {
      return false;
    }

    const existingItem = this.cartItems.find(item =>
      item.flick.id === flick.id && item.scheduleId === scheduleId
    );

    if (existingItem) {
      if (existingItem.quantity + quantity > schedule.availableTickets) {
        return false;
      }
      existingItem.quantity += quantity;
      existingItem.subtotal = existingItem.quantity * flick.ticketPrice;
    } else {
      this.cartItems.push({
        flick: flick,
        scheduleId: scheduleId,
        scheduleDateTime: scheduleDateTime,
        quantity: quantity,
        subtotal: quantity * flick.ticketPrice
      });
    }

    this.cartSubject.next([...this.cartItems]);
    this.saveCart();
    return true;
  }

  updateQuantity(showId: number, scheduleId: number, quantity: number): boolean {
    const item = this.cartItems.find(item =>
      item.flick.id === showId && item.scheduleId === scheduleId
    );

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(showId, scheduleId);
        return true;
      }

      item.quantity = quantity;
      item.subtotal = quantity * item.flick.ticketPrice;
      this.cartSubject.next([...this.cartItems]);
      this.saveCart();
      return true;
    }
    return false;
  }

  removeFromCart(showId: number, scheduleId: number): void {
    this.cartItems = this.cartItems.filter(item =>
      !(item.flick.id === showId && item.scheduleId === scheduleId)
    );
    this.cartSubject.next([...this.cartItems]);
    this.saveCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
    this.saveCart();
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.subtotal, 0);
  }

  async checkout(paymentMethod: string = 'Credit Card'): Promise<boolean> {
    if (this.cartItems.length === 0) {
      await alert({
        title: 'Empty Cart',
        message: 'Your cart is empty.',
        okButtonText: 'OK'
      });
      return false;
    }

    if (!this.networkService.isConnected()) {
      await alert({
        title: 'No Internet',
        message: 'Please connect to the internet to complete your purchase.',
        okButtonText: 'OK'
      });
      return false;
    }

    try {
      for (const item of this.cartItems) {
        const saleData = {
          scheduleId: item.scheduleId,
          showId: item.flick.id,
          showTitle: item.flick.title,
          scheduleDateTime: item.scheduleDateTime,
          quantity: item.quantity,
          unitPrice: item.flick.ticketPrice,
          totalAmount: item.subtotal,
          paymentMethod
        };

        const response: any = await this.apiService.createSale(saleData).toPromise();
        if (!response.success) {
          throw new Error(response.error);
        }
      }

      await alert({
        title: 'Purchase Successful!',
        message: `Thank you for your purchase!\n\nTotal: $${this.getTotalPrice().toFixed(2)}`,
        okButtonText: 'OK'
      });

      this.clearCart();
      return true;
    } catch (error) {
      await alert({
        title: 'Purchase Failed',
        message: 'Unable to complete purchase. Please try again.',
        okButtonText: 'OK'
      });
      return false;
    }
  }
}
