import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { Component, OnInit, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FlickService } from '~/core/services/flick.service';
import { CartService } from '~/core/services/cart.service';
import { FlickModel } from '~/core/models/flick.model';
import { alert, prompt } from '@nativescript/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  private flickService = inject(FlickService);
  private cartService = inject(CartService);
  private router = inject(RouterExtensions);

  favoriteFlicks: FlickModel[] = [];
  private favoritesSubscription: Subscription | undefined;
  private isBuying = false;

  ngOnInit(): void {
    // Subscribe to favorites changes
    this.favoritesSubscription = this.flickService.getFavorites().subscribe(async favorites => {
      // Get full show objects for favorite IDs
      const allShows = this.flickService.getFlicks();
      this.favoriteFlicks = allShows.filter(show => favorites.includes(show.id));
    });

    // Load favorites
    this.flickService.fetchFavoritesFromServer();
  }

  ngOnDestroy(): void {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  getFavorites(): FlickModel[] {
    return this.favoriteFlicks;
  }

  onItemTap(args: any): void {
    if (this.isBuying) {
      this.isBuying = false;
      return;
    }

    const index = args.index;
    const flick = this.favoriteFlicks[index];
    if (flick) {
      this.router.navigate(['/details', flick.id]);
    }
  }

  async onBuyTap(flick: FlickModel): Promise<void> {
    this.isBuying = true;

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

    const schedule = availableSchedules[0];

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
        message: `${quantity} ticket(s) for ${flick.title} added to your cart.`,
        okButtonText: 'OK'
      });
    } else {
      await alert({
        title: 'Not Available',
        message: `Sorry, only ${schedule.availableTickets} tickets available.`,
        okButtonText: 'OK'
      });
    }

    this.isBuying = false;
  }

  async onFavoriteTap(flick: FlickModel): Promise<void> {
    await this.flickService.toggleFavorite(flick.id);
    // List will automatically update via subscription
  }

  goToMaster(): void {
    this.router.navigate(['/master']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

}
