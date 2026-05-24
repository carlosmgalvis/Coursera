import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { FlickService } from '~/core/services/flick.service';
import { CartService } from '~/core/services/cart.service';
import { FlickModel, ShowSchedule } from '~/core/models/flick.model';
import { alert, prompt, ActionOptions, action } from '@nativescript/core';

@Component({
  selector: 'details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  flickService = inject(FlickService);
  cartService = inject(CartService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(RouterExtensions);

  flick: FlickModel | undefined = undefined;
  selectedSchedule: ShowSchedule | undefined = undefined;
  availableSchedules: ShowSchedule[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        await this.loadShow(+id);
      }
    });
  }

  async loadShow(id: number): Promise<void> {
    this.flick = this.flickService.getFlickById(id);
    if (this.flick && this.flick.schedules) {
      this.availableSchedules = this.flick.schedules.filter(
        s => new Date(s.scheduleDateTime) >= new Date()
      );
      if (this.availableSchedules.length > 0) {
        this.selectedSchedule = this.availableSchedules[0];
      }
    }
  }

  goBack(): void {
    this.router.back();
  }

  async selectSchedule(): Promise<void> {
    if (!this.availableSchedules.length) {
      await alert({
        title: 'No Shows Available',
        message: 'There are no upcoming shows for this performance.',
        okButtonText: 'OK'
      });
      return;
    }

    const options: ActionOptions = {
      title: 'Select Show Date & Time',
      cancelButtonText: 'Cancel',
      actions: this.availableSchedules.map(schedule =>
        new Date(schedule.scheduleDateTime).toLocaleString()
      )
    };

    const result = await action(options);
    if (result !== 'Cancel') {
      const selected = this.availableSchedules.find(s =>
        new Date(s.scheduleDateTime).toLocaleString() === result
      );
      if (selected) {
        this.selectedSchedule = selected;
      }
    }
  }

  async addToCart(): Promise<void> {
    if (!this.flick || !this.selectedSchedule) {
      await alert({
        title: 'No Show Selected',
        message: 'Please select a show date and time.',
        okButtonText: 'OK'
      });
      return;
    }

    const result = await prompt({
      title: 'Add to Cart',
      message: `How many tickets for ${this.flick.title}?\nDate: ${new Date(this.selectedSchedule.scheduleDateTime).toLocaleString()}\nPrice: $${this.flick.ticketPrice.toFixed(2)} each\nAvailable: ${this.selectedSchedule.availableTickets}`,
      okButtonText: 'Add to Cart',
      cancelButtonText: 'Cancel',
      defaultText: '1',
      inputType: 'number'
    });

    if (!result.result) return;

    const quantity = parseInt(result.text, 10);

    if (isNaN(quantity) || quantity <= 0) {
      await alert({
        title: 'Invalid Quantity',
        message: 'Please enter a valid quantity.',
        okButtonText: 'OK'
      });
      return;
    }

    const success = this.cartService.addToCart(
      this.flick,
      this.selectedSchedule.id,
      this.selectedSchedule.scheduleDateTime,
      quantity
    );

    if (success) {
      await alert({
        title: 'Added to Cart',
        message: `${quantity} ticket(s) for ${this.flick.title} added to your cart.\n\nSubtotal: $${(quantity * this.flick.ticketPrice).toFixed(2)}`,
        okButtonText: 'OK'
      });
    } else {
      await alert({
        title: 'Not Available',
        message: `Sorry, only ${this.selectedSchedule.availableTickets} tickets available for this showtime.`,
        okButtonText: 'OK'
      });
    }
  }

  async toggleFavorite(): Promise<void> {
    if (!this.flick) return;

    const isFavorite = await this.flickService.toggleFavorite(this.flick.id);
    if (this.flick) {
      this.flick.isFavorite = isFavorite;
    }
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  getFormattedDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  getFormattedTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
