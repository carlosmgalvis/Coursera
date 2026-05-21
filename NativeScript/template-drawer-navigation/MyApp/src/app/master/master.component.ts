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
    const index = args.index;
    const flick = this.flickService.getFlicks()[index];
    if (flick) {
      console.log('Navigating to details for:', flick.title);
      this.router.navigate(['/details', flick.id]);
    }
  }

  // This handles the buy button tap
  async onBuyTap(flick: FlickModel): Promise<void> {
    const result = await prompt({
      title: 'Add to Cart',
      message: `How many tickets for ${flick.title}?\nPrice: $${flick.ticketPrice.toFixed(2)} each\nAvailable: ${flick.availableTickets}`,
      okButtonText: 'Add to Cart',
      cancelButtonText: 'Cancel',
      defaultText: '1',
      inputType: 'number'
    });

    if (!result.result) {
      return;
    }

    const quantity = parseInt(result.text, 10);

    if (isNaN(quantity) || quantity <= 0) {
      await alert({
        title: 'Invalid Quantity',
        message: 'Please enter a valid quantity.',
        okButtonText: 'OK'
      });
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
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToSalesHistory(): void {
    this.router.navigate(['/sales-history']);
  }
}
