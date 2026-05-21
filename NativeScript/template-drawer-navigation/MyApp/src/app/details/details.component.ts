import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { FlickService } from "~/core/services/flick.service";
import { CartService } from "~/core/services/cart.service";
import { FlickModel } from "~/core/models/flick.model";
import { alert, prompt } from '@nativescript/core';

@Component({
  selector: "details",
  templateUrl: "details.component.html"
})
export class DetailsComponent implements OnInit {
  flickService = inject(FlickService);
  cartService = inject(CartService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(RouterExtensions);
  flick: FlickModel | undefined = undefined;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.flick = this.flickService.getFlickById(+id);
      }
    });
  }

  goBack(): void {
    this.router.back();
  }

  async addToCart(): Promise<void> {
    if (!this.flick) return;

    const result = await prompt({
      title: 'Add to Cart',
      message: `How many tickets for ${this.flick.title}?\nPrice: $${this.flick.ticketPrice.toFixed(2)} each\nAvailable: ${this.flick.availableTickets}`,
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

    const success = this.cartService.addToCart(this.flick, quantity);

    if (success) {
      await alert({
        title: 'Added to Cart',
        message: `${quantity} ticket(s) for ${this.flick.title} added to your cart.\n\nSubtotal: $${(quantity * this.flick.ticketPrice).toFixed(2)}`,
        okButtonText: 'OK'
      });
    } else {
      await alert({
        title: 'Not Available',
        message: `Sorry, only ${this.flick.availableTickets} tickets available.`,
        okButtonText: 'OK'
      });
    }
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
