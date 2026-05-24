import { Component, OnInit, inject } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import { FlickService } from '~/core/services/flick.service';
import { CartService } from '~/core/services/cart.service';
import { RouterExtensions } from '@nativescript/angular';
import { FlickModel, ShowSchedule } from '~/core/models/flick.model';
import { alert, prompt, ActionOptions, action } from '@nativescript/core';

@Component({
  selector: 'Master',
  templateUrl: './master.component.html',
})
export class MasterComponent implements OnInit {
  flickService = inject(FlickService);
  cartService = inject(CartService);
  router = inject(RouterExtensions);
  private isBuying = false;

  ngOnInit(): void {}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  getFlicks() {
    return this.flickService.getFlicks();
  }

  onItemTap(args: any): void {
    if (this.isBuying) {
      this.isBuying = false;
      return;
    }

    const index = args.index;
    const flick = this.flickService.getFlicks()[index];
    if (flick) {
      this.router.navigate(['/details', flick.id]);
    }
  }

  async onBuyTap(flick: FlickModel): Promise<void> {
    this.isBuying = true;

    // Get available schedules
    const availableSchedules = flick.schedules?.filter(
      s => new Date(s.scheduleDateTime) >= new Date()
    ) || [];

    if (availableSchedules.length === 0) {
      await alert({
        title: 'No Shows Available',
        message: 'There are no upcoming shows for this performance.',
        okButtonText: 'OK'
      });
      this.isBuying = false;
      return;
    }

    // Let user select date/time
    const scheduleOptions = availableSchedules.map((s, index) => ({
      text: new Date(s.scheduleDateTime).toLocaleString(),
      index: index
    }));

    // Simple schedule selection - you can improve this with a proper dialog
    const schedule = availableSchedules[0]; // For now, take first available

    const result = await prompt({
      title: 'Add to Cart',
      message: `How many tickets for ${flick.title}?\nDate: ${new Date(schedule.scheduleDateTime).toLocaleString()}\nPrice: $${flick.ticketPrice.toFixed(2)} each\nAvailable: ${schedule.availableTickets}`,
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

    const success = this.cartService.addToCart(flick, schedule.id, schedule.scheduleDateTime, quantity);

    if (success) {
      await alert({
        title: 'Added to Cart',
        message: `${quantity} ticket(s) for ${flick.title} added to your cart.\n\nSubtotal: $${(quantity * flick.ticketPrice).toFixed(2)}`,
        okButtonText: 'OK'
      });
    } else {
      await alert({
        title: 'Not Available',
        message: `Sorry, only ${schedule.availableTickets} tickets available for this showtime.`,
        okButtonText: 'OK'
      });
    }

    this.isBuying = false;
  }

  async onFavoriteTap(flick: FlickModel): Promise<void> {
    const isFavorite = await this.flickService.toggleFavorite(flick.id);
    // No alert to avoid disruption, just update UI
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToFavorites(): void {
    this.router.navigate(['/featured']);
  }
}
