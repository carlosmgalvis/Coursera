import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { CartService } from '~/core/services/cart.service';
import { CartItem } from '~/core/models/flick.model';
import { Subscription } from 'rxjs';
import { alert, confirm } from '@nativescript/core';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private router = inject(RouterExtensions);

  cartItems: CartItem[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;
  private cartSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.totalItems = this.cartService.getTotalItems();
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    this.cartService.updateQuantity(item.flick.id, newQuantity);
  }

  async removeItem(item: CartItem): Promise<void> {
    const result = await confirm({
      title: 'Remove Item',
      message: `Remove ${item.flick.title} from cart?`,
      okButtonText: 'Remove',
      cancelButtonText: 'Cancel'
    });

    if (result) {
      this.cartService.removeFromCart(item.flick.id);
    }
  }

  async checkout(): Promise<void> {
    if (this.cartItems.length === 0) {
      await alert({
        title: 'Empty Cart',
        message: 'Your cart is empty. Add some items before checking out.',
        okButtonText: 'OK'
      });
      return;
    }

    const result = await confirm({
      title: 'Confirm Purchase',
      message: `Total: $${this.totalPrice.toFixed(2)}\n\nProceed with checkout?`,
      okButtonText: 'Checkout',
      cancelButtonText: 'Cancel'
    });

    if (result) {
      const sale = this.cartService.checkout('Credit Card');

      if (sale) {
        await alert({
          title: 'Purchase Successful!',
          message: `Thank you for your purchase!\n\nTotal: $${sale.totalAmount.toFixed(2)}\nSale ID: ${sale.id}`,
          okButtonText: 'OK'
        });

        this.router.navigate(['/sales-history']);
      } else {
        await alert({
          title: 'Checkout Failed',
          message: 'Unable to complete purchase. Some items may be out of stock.',
          okButtonText: 'OK'
        });
      }
    }
  }

  goToMaster(): void {
    this.router.navigate(['/master'], { clearHistory: true });
  }

  continueShopping(): void {
    this.router.navigate(['/master']);
  }
}
