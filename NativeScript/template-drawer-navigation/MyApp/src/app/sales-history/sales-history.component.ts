import { Component, OnInit, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { CartService } from '~/core/services/cart.service';
import { SaleHistory } from '~/core/models/flick.model';
import { alert } from '@nativescript/core';

@Component({
  selector: 'sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss']
})
export class SalesHistoryComponent implements OnInit {
  private cartService = inject(CartService);
  private router = inject(RouterExtensions);
  salesHistory: SaleHistory[] = [];
  totalSales: number = 0;

  ngOnInit(): void {
    this.loadSalesHistory();
  }

  loadSalesHistory(): void {
    this.salesHistory = this.cartService.getSalesHistory();
    this.totalSales = this.cartService.getTotalSales();
  }

  async viewSaleDetails(sale: SaleHistory): Promise<void> {
    let itemsList = '';
    sale.items.forEach(item => {
      itemsList += `${item.flick.title} x${item.quantity} - $${item.subtotal.toFixed(2)}\n`;
    });

    await alert({
      title: `Sale Details`,
      message: `ID: ${sale.id}\nDate: ${new Date(sale.date).toLocaleString()}\n\nItems:\n${itemsList}\n\nTotal: $${sale.totalAmount.toFixed(2)}\nPayment: ${sale.paymentMethod}`,
      okButtonText: 'Close'
    });
  }
  goToMaster(): void {
    this.router.navigate(['/master'], { clearHistory: true });
  }

  formatDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }
}
