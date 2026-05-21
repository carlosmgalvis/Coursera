import { Injectable } from '@angular/core'
import { Product } from './product.model'
import { Application } from '@nativescript/core'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _products: Product[] = [
    { id: 1, name: 'Laptop', price: 999.99, description: 'Potente laptop para trabajo', category: 'Electrónica' },
    { id: 2, name: 'Smartphone', price: 599.99, description: 'Smartphone de última generación', category: 'Electrónica' },
    { id: 3, name: 'Auriculares', price: 149.99, description: 'Auriculares inalámbricos con cancelación de ruido', category: 'Accesorios' },
    { id: 4, name: 'Tablet', price: 399.99, description: 'Tablet para productividad', category: 'Electrónica' },
    { id: 5, name: 'Smartwatch', price: 249.99, description: 'Reloj inteligente con múltiples funciones', category: 'Accesorios' },
    { id: 6, name: 'Cámara', price: 799.99, description: 'Cámara profesional para fotografía', category: 'Fotografía' },
  ]

  private _selectedProduct: Product | null = null

  // Variable que solo se asigna en Android (requisito 10)
  platformMessage: string = ''

  constructor() {
    // Asignación de valor solo en Android
    if (Application.android) {
      this.platformMessage = 'Estás usando Android - ¡Disfruta la experiencia!'
    }
  }

  getProducts(): Product[] {
    return this._products
  }

  getProductById(id: number): Product | undefined {
    return this._products.find(p => p.id === id)
  }

  setSelectedProduct(product: Product): void {
    this._selectedProduct = product
  }

  getSelectedProduct(): Product | null {
    return this._selectedProduct
  }
}
