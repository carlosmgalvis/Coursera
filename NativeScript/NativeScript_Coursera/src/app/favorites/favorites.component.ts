import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as application from '@nativescript/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFavoritesList, selectReadItemsList } from '../store';
import { Product } from '../shared/services/product.service';
import { addReadItem, removeReadItem, toggleFavorite } from '../store/favorites.actions';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'Favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<Product[]>;
  readItems$: Observable<Product[]>;

  constructor(
    private store: Store<{ favorites: any }>,
    private routerExtensions: RouterExtensions
  ) {
    this.favorites$ = this.store.select(selectFavoritesList);
    this.readItems$ = this.store.select(selectReadItemsList);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>application.getRootView();
    sideDrawer.showDrawer();
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onReadNow(product: Product): void {
    // Dispatch an action to mark as read
    this.store.dispatch(addReadItem({ product }));
  }

  onRemoveFromRead(productId: number): void {
    this.store.dispatch(removeReadItem({ productId }));
  }

  toggleFavorite(event: any, product: Product): void {
    event.stopPropagation(); // Prevent triggering the item tap
    this.store.dispatch(toggleFavorite({ product }));
  }

  onItemTap(product: Product): void {
    // Navigate to product detail or search detail with product id
    this.routerExtensions.navigate(['/search/detail', product.id], {
      transition: { name: 'slideLeft' }
    });
  }
}