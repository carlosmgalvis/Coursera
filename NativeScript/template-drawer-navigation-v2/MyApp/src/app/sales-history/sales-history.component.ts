import { Component, OnInit, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ApiService } from '~/core/services/api.service';
import { StorageService } from '~/core/services/storage.service';
import { NetworkService } from '~/core/services/network.service';
import { alert } from '@nativescript/core';

interface Sale {
  id: string;
  showTitle: string;
  quantity: number;
  totalAmount: number;
  scheduleDateTime: string;
  saleDate: string;
  paymentMethod: string;
}

@Component({
  selector: 'sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss']
})
export class SalesHistoryComponent implements OnInit {
  private apiService = inject(ApiService);
  private storageService = inject(StorageService);
  private networkService = inject(NetworkService);
  private router = inject(RouterExtensions);

  salesHistory: Sale[] = [];
  totalSales: number = 0;
  totalTickets: number = 0;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadSalesHistory();
  }

  async loadSalesHistory(): Promise<void> {
    this.isLoading = true;

    // Load from local storage first
    const localSales = await this.storageService.getOfflineData('sales');
    if (localSales) {
      this.salesHistory = localSales;
      this.calculateTotals();
    }

    // Fetch from server if online
    if (this.networkService.isConnected()) {
      try {
        const response: any = await this.apiService.getSalesHistory().toPromise();
        if (response && response.success) {
          this.salesHistory = response.data;
          await this.storageService.storeOfflineData('sales', this.salesHistory);
          this.calculateTotals();
        }
      } catch (error) {
        console.error('Error fetching sales history:', error);
      }
    }

    this.isLoading = false;
  }

  calculateTotals(): void {
    this.totalSales = this.salesHistory.reduce((sum, sale) => sum + sale.totalAmount, 0);
    this.totalTickets = this.salesHistory.reduce((sum, sale) => sum + sale.quantity, 0);
  }

  async viewSaleDetails(sale: Sale): Promise<void> {
    await alert({
      title: `Sale Details`,
      message: `ID: ${sale.id}\nShow: ${sale.showTitle}\nDate: ${this.formatDate(sale.scheduleDateTime)}\nQuantity: ${sale.quantity}\nTotal: $${sale.totalAmount.toFixed(2)}\nPayment: ${sale.paymentMethod}\nPurchased: ${this.formatDate(sale.saleDate)}`,
      okButtonText: 'Close'
    });
  }

  goToMaster(): void {
    this.router.navigate(['/master']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  formatShortDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
