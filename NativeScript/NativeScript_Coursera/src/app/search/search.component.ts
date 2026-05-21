import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import * as application from '@nativescript/core'
import { Frame } from '@nativescript/core'
import { RouterExtensions } from '@nativescript/angular'
import { ProductService, Product } from '../shared/services/product.service'
import { Dialogs } from '@nativescript/core'
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { toggleFavorite, addReadItem } from '../store/favorites.actions'
import { selectFavoritesList } from '../store'
import { minLengthValidator } from '../shared/validators/custom-validators'

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products: Product[] = []
  searchForm: FormGroup
  isRefreshing: boolean = false
  rotationAngle: number = 0
  favorites: Product[] = []

  constructor(
    private productService: ProductService,
    private routerExtensions: RouterExtensions,
    private fb: FormBuilder,
    private store: Store<{ favorites: any }>
  ) {
    this.searchForm = this.fb.group({
      searchTerm: new FormControl('', [minLengthValidator(3)])
    })
  }

  ngOnInit(): void {
    this.loadProducts();
    this.store.select(selectFavoritesList).subscribe(favs => {
      this.favorites = favs;
    });
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>application.getRootView()
    sideDrawer.showDrawer()
  }

  // Load products from API
  loadProducts(): void {
    const searchTerm = this.searchForm.get('searchTerm')?.value || '';
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  // Two-way binding con búsqueda
  onSearchChange(): void {
    const term = this.searchForm.get('searchTerm')?.value || ''
    if (term.length >= 3 || term.length === 0) {
      this.productService.getProducts(term).subscribe(products => {
        this.products = products;
        // Show toast using the searchService from before? We'll create a simple toast method
        this.showToast(`Se encontraron ${this.products.length} resultados`);
      });
    }
  }

   // Simple toast method
   private showToast(message: string): void {
     // Using the same approach as in search.service but simplified
     if (application.android) {
       const toast = android.widget.Toast.makeText(
         application.android.context,
         message,
         android.widget.Toast.LENGTH_SHORT
       )
       toast.show()
     } else if (application.ios) {
       // For iOS we would use UIAlertController, but for simplicity we'll just log
       console.log('iOS Toast:', message);
     }
   }

  // Navegación a detalle
  onItemTap(product: Product): void {
    // We'll need a product detail service or just pass the product ID
    // For now, we'll navigate to a generic detail page (to be implemented)
    // This would ideally set the selected product in a service
    this.routerExtensions.navigate(['/search/detail', product.id], {
      transition: { name: 'slideLeft' }
    })
  }

  // Pull to refresh
  onPullToRefresh(args: any): void {
    this.isRefreshing = true
    setTimeout(() => {
      // Reload products (simulating new data)
      this.loadProducts();
      
      this.showToast('Lista actualizada');
      
      args.object.notifyPullToRefreshFinished()
      this.isRefreshing = false
    }, 1500)
  }

  // Check if a product is in favorites
  isFavorite(product: Product): boolean {
    return this.favorites.some(fav => fav.id === product.id);
  }

  // Toggle favorite for a product
  toggleFavorite(product: Product): void {
    this.store.dispatch(toggleFavorite({ product }));
    this.showToast(this.isFavorite(product) ? 
      `${product.title} eliminado de favoritos` : 
      `${product.title} agregado a favoritos`);
  }

  // Mark as read (dispatch to Redux)
  markAsRead(product: Product): void {
    this.store.dispatch(addReadItem({ product }));
    this.showToast(`${product.title} marcado como leído`);
  }

  // Animación de rotación
  onAnimateIcon(): void {
    this.rotationAngle = this.rotationAngle === 0 ? 360 : 0
  }
}
