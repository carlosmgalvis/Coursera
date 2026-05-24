import { Component, OnInit, inject } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Application } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { FlickService } from '~/core/services/flick.service';
import { CartService } from '~/core/services/cart.service';
import { FlickModel, ShowSchedule } from '~/core/models/flick.model';
import { alert, prompt } from '@nativescript/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private flickService = inject(FlickService);
  private cartService = inject(CartService);
  private router = inject(RouterExtensions);

  allFlicks: FlickModel[] = [];
  filteredFlicks: FlickModel[] = [];
  searchQuery: string = '';
  isSearching: boolean = false;
  selectedGenre: string = '';
  selectedDate: string = '';
  private isBuying = false;

  genres: string[] = ['All', 'Musical', 'Drama', 'Comedy', 'Action'];

  ngOnInit(): void {
    this.loadShows();
  }

  async loadShows(): Promise<void> {
    this.allFlicks = this.flickService.getFlicks();
    this.filteredFlicks = this.allFlicks;
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  onSearchTap(): void {
    this.isSearching = true;
  }

  onSearchClose(): void {
    this.isSearching = false;
    this.searchQuery = '';
    this.applyFilters();
  }

  onSearchTextChange(args: any): void {
    const searchBar = args.object;
    this.searchQuery = searchBar.text.toLowerCase();
    this.applyFilters();
  }

  onSearchSubmit(args: any): void {
    const searchBar = args.object;
    this.searchQuery = searchBar.text.toLowerCase();
    this.applyFilters();
  }

  filterByGenre(genre: string): void {
    this.selectedGenre = genre === 'All' ? '' : genre;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.allFlicks;

    // Apply search filter
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      filtered = filtered.filter(flick =>
        flick.title.toLowerCase().includes(this.searchQuery) ||
        flick.genre.toLowerCase().includes(this.searchQuery) ||
        flick.description.toLowerCase().includes(this.searchQuery)
      );
    }

    // Apply genre filter
    if (this.selectedGenre) {
      filtered = filtered.filter(flick => flick.genre === this.selectedGenre);
    }

    this.filteredFlicks = filtered;
  }

  getResultCount(): number {
    return this.filteredFlicks.length;
  }

  onItemTap(args: any): void {
    if (this.isBuying) {
      this.isBuying = false;
      return;
    }

    const index = args.index;
    const flick = this.filteredFlicks[index];
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
        message: `${quantity} ticket(s) for ${flick.title} added to your cart.\n\nSubtotal: $${(quantity * flick.ticketPrice).toFixed(2)}`,
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
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  clearFilters(): void {
    this.selectedGenre = '';
    this.searchQuery = '';
    this.applyFilters();
  }
}
