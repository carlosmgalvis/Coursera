import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { ProductsService } from '../products.service'
import { Product } from '../product.model'

@Component({
  selector: 'ns-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []
  platformMessage: string = ''

  constructor(
    private productsService: ProductsService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.products = this.productsService.getProducts()
    // Asignación de valor solo en Android (requisito 10)
    if (Application.android) {
      this.platformMessage = '🤖 Ejecutando en Android'
    }
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  onProductTap(product: Product): void {
    this.productsService.setSelectedProduct(product)
    this.routerExtensions.navigate(['/products/detail'], {
      transition: { name: 'slide' }
    })
  }
}
