import { Component, OnInit, inject } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import { FlickService } from '~/core/services/flick.service';
import { CartService } from '~/core/services/cart.service';
import { RouterExtensions } from '@nativescript/angular';
import { FlickModel } from '~/core/models/flick.model';
import { alert, prompt } from '@nativescript/core';

@Component({
  selector: 'Master',
  templateUrl: './master.component.html',
})
export class MasterComponent implements OnInit {
  flickService = inject(FlickService);
  cartService = inject(CartService);
  router = inject(RouterExtensions);
  private isBuying = false; // Flag to prevent navigation when buying
  private isFavoriting = false; // Flag to prevent navigation when toggling favorites

  ngOnInit(): void {}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  getFlicks() {
    return this.flickService?.getFlicks() || [];
  }

  // This handles navigation to details
  onItemTap(args: any): void {

    // Don't navigate if we're in the middle of buying or favoriting
    if (this.isBuying || this.isFavoriting) {
      this.isBuying = false;
      this.isFavoriting = false;
      return;
    }

 // Get index from args (could be object with index or direct number)
 // const index = typeof args === 'object' ? args.index : args;
 const index = args.index;
 const flick = this.flickService.getFlicks()[index];
  if (flick) {

    console.log('Navigating to details for:', flick.title);

    this.router.navigate(['/details', flick.id]);
  }
  }

  // This handles the buy button tap
  async onBuyTap(flick: FlickModel): Promise<void> {
    // Set flag to prevent navigation
    this.isBuying = true;

    const result = await prompt({
      title: 'Add to Cart',
      message: `How many tickets for ${flick.title}?\nPrice: $${flick.ticketPrice.toFixed(2)} each\nAvailable: ${flick.availableTickets}`,
      okButtonText: 'Add to Cart',
      cancelButtonText: 'Cancel',
      defaultText: '1',
      inputType: 'number'
    });

    if (!result.result) {
      this.isBuying = false;
      return;
    }

    const quantity = parseInt(result.text, 10);

    if (isNaN(quantity) || quantity <= 0) {
      await alert({
        title: 'Invalid Quantity',
        message: 'Please enter a valid quantity.',
        okButtonText: 'OK'
      });
      this.isBuying = false;
      return;
    }

    const success = this.cartService.addToCart(flick, quantity);

    if (success) {
      await alert({
        title: 'Added to Cart',
        message: `${quantity} ticket(s) for ${flick.title} added to your cart.\n\nSubtotal: $${(quantity * flick.ticketPrice).toFixed(2)}`,
        okButtonText: 'OK'
      });
    } else {
      await alert({
        title: 'Not Available',
        message: `Sorry, only ${flick.availableTickets} tickets available.`,
        okButtonText: 'OK'
      });
    }

    this.isBuying = false;
  }

  // This handles the favorite button tap
  async onFavoriteTap(flick: FlickModel): Promise<void> {
    // Set flag to prevent navigation
    this.isFavoriting = true;

    const isFavorite = this.flickService.toggleFavorite(flick.id);

    this.isFavoriting = false;
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToFavorites(): void {
    this.router.navigate(['/featured']);
  }
}
