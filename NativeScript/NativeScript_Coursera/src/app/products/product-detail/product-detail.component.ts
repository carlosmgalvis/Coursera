import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { ProductsService } from '../products.service'
import { Product } from '../product.model'

@Component({
  selector: 'ns-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null

  constructor(
    private productsService: ProductsService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.product = this.productsService.getSelectedProduct()
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  onBackTap(): void {
    this.routerExtensions.back()
  }
}
