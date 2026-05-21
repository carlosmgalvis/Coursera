import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import * as application from '@nativescript/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { selectReadItemsList } from '../store'
import { Product } from '../shared/services/product.service'
import { removeReadItem } from '../store/favorites.actions'
import { RouterExtensions } from '@nativescript/angular'

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  readItems$: Observable<Product[]>

  constructor(
    private store: Store<{ favorites: any }>,
    private routerExtensions: RouterExtensions
  ) {
    this.readItems$ = this.store.select(selectReadItemsList)
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>application.getRootView()
    sideDrawer.showDrawer()
  }

  onItemTap(product: Product): void {
    // Navigate to product detail
    this.routerExtensions.navigate(['/search/detail', product.id], {
      transition: { name: 'slideLeft' }
    });
  }

  removeFromRead(event: any, productId: number): void {
    event.stopPropagation(); // Prevent triggering the item tap
    this.store.dispatch(removeReadItem({ productId }));
  }
}
