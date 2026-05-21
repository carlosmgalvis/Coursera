import { Injectable } from '@angular/core'
import { Application, Frame } from '@nativescript/core'

export interface SearchItem {
  id: number
  title: string
  category: string
  description: string
  rating: number
  price: number
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _allItems: SearchItem[] = [
    { id: 1, title: 'Laptop Gaming', category: 'Electrónica', description: 'Laptop para juegos de alta gama', rating: 4.5, price: 1299.99 },
    { id: 2, title: 'Smartphone Pro', category: 'Electrónica', description: 'Teléfono inteligente profesional', rating: 4.8, price: 899.99 },
    { id: 3, title: 'Auriculares BT', category: 'Audio', description: 'Auriculares Bluetooth premium', rating: 4.2, price: 199.99 },
    { id: 4, title: 'Smart TV 55"', category: 'Electrónica', description: 'Televisión inteligente 4K', rating: 4.6, price: 599.99 },
    { id: 5, title: 'Teclado Mecánico', category: 'Accesorios', description: 'Teclado mecánico RGB', rating: 4.4, price: 149.99 },
    { id: 6, title: 'Mouse Gamer', category: 'Accesorios', description: 'Mouse con sensor de alta precisión', rating: 4.3, price: 79.99 },
    { id: 7, title: 'Tablet Pro', category: 'Electrónica', description: 'Tablet para profesionales', rating: 4.7, price: 699.99 },
    { id: 8, title: 'Cámara DSLR', category: 'Fotografía', description: 'Cámara profesional', rating: 4.9, price: 1499.99 },
    { id: 9, title: 'Drone 4K', category: 'Drones', description: 'Drone con cámara 4K', rating: 4.5, price: 799.99 },
    { id: 10, title: 'Smartwatch', category: 'Wearables', description: 'Reloj inteligente multisport', rating: 4.4, price: 299.99 },
  ]

  private _filteredItems: SearchItem[] = []
  private _selectedItem: SearchItem | null = null

  constructor() {
    this._filteredItems = [...this._allItems]
  }

  search(query: string): SearchItem[] {
    if (!query || query.trim() === '') {
      this._filteredItems = [...this._allItems]
    } else {
      const lowerQuery = query.toLowerCase()
      this._filteredItems = this._allItems.filter(item => 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
      )
    }
    return this._filteredItems
  }

  getFilteredItems(): SearchItem[] {
    return this._filteredItems
  }

  setSelectedItem(item: SearchItem): void {
    this._selectedItem = item
  }

  getSelectedItem(): SearchItem | null {
    return this._selectedItem
  }

  updateItemCategory(itemId: number, newCategory: string): void {
    const item = this._allItems.find(i => i.id === itemId)
    if (item) {
      item.category = newCategory
    }
  }

  addRandomItem(): SearchItem {
    const categories = ['Electrónica', 'Audio', 'Accesorios', 'Fotografía', 'Wearables', 'Gaming']
    const randomItem: SearchItem = {
      id: Date.now(),
      title: `Producto ${Math.floor(Math.random() * 1000)}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      description: 'Producto agregado recientemente',
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      price: Math.round(Math.random() * 500 * 100) / 100
    }
    this._allItems.push(randomItem)
    return randomItem
  }

  // Toast usando API nativa
  showToast(message: string): void {
    if (Application.android) {
      const toast = android.widget.Toast.makeText(
        Application.android.context,
        message,
        android.widget.Toast.LENGTH_SHORT
      )
      toast.show()
    } else if (Application.ios) {
      // Para iOS usamos console.log como alternativa temporal
      console.log('Toast: ' + message)
    }
  }
}
