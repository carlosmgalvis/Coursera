import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { FlickService } from '~/core/services/flick.service';
import { CartService } from '~/core/services/cart.service';
import { FlickModel } from '~/core/models/flick.model';
import { alert, prompt } from '@nativescript/core';
import { Subscription } from 'rxjs';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'


@Component({
  selector: 'featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit, OnDestroy {
  private flickService = inject(FlickService);
  private cartService = inject(CartService);
  private router = inject(RouterExtensions);

  favoriteFlicks: FlickModel[] = [];
  private favoritesSubscription: Subscription | undefined;
  private isBuying = false;
  private isFavoriting = false;

  ngOnInit(): void {
    // Subscribe to favorites changes
    this.favoritesSubscription = this.flickService.getFavorites().subscribe(favorites => {
      this.favoriteFlicks = favorites;
    });
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
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
    if (this.isBuying || this.isFavoriting) {
      this.isBuying = false;
      this.isFavoriting = false;
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

  async onFavoriteTap(flick: FlickModel): Promise<void> {
    this.isFavoriting = true;

    this.flickService.toggleFavorite(flick.id);

    // Show feedback
    await alert({
      title: 'Removed from Favorites',
      message: `${flick.title} has been removed from your favorites.`,
      okButtonText: 'OK'
    });

    this.isFavoriting = false;
  }

  goToMaster(): void {
    this.router.navigate(['/master']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
