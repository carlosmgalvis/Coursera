import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { Component, OnInit, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ApiService } from '~/core/services/api.service';
import { StorageService } from '~/core/services/storage.service';
import { NetworkService } from '~/core/services/network.service';
import { alert } from '@nativescript/core';

interface SaleItem {
  showTitle: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Sale {
  id: string;
  showTitle: string;
  quantity: number;
  totalAmount: number;
  scheduleDateTime: string;
  saleDate: string;
  paymentMethod: string;
  items?: SaleItem[];
}

@Component({
  selector: 'purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {
  private apiService = inject(ApiService);
  private storageService = inject(StorageService);
  private networkService = inject(NetworkService);
  private router = inject(RouterExtensions);

  purchases: Sale[] = [];
  isLoading: boolean = true;
  totalSpent: number = 0;
  totalTickets: number = 0;
  totalTransactions: number = 0;

  ngOnInit(): void {
    this.loadPurchaseHistory();
  }

  async loadPurchaseHistory(): Promise<void> {
    this.isLoading = true;

    // Load from local storage first
    const localPurchases = await this.storageService.getOfflineData('purchases');
    if (localPurchases && localPurchases.length > 0) {
      this.purchases = localPurchases;
      this.calculateTotals();
    }

    // Fetch from server if online
    if (this.networkService.isConnected()) {
      try {
        const response: any = await this.apiService.getSalesHistory().toPromise();
        if (response && response.success) {
          this.purchases = response.data;
          await this.storageService.storeOfflineData('purchases', this.purchases);
          this.calculateTotals();
        }
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    }

    this.isLoading = false;
  }

  calculateTotals(): void {
    this.totalSpent = this.purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
    this.totalTickets = this.purchases.reduce((sum, purchase) => sum + purchase.quantity, 0);
    this.totalTransactions = this.purchases.length;
  }

  async viewPurchaseDetails(purchase: Sale): Promise<void> {
    let itemsText = '';
    if (purchase.items && purchase.items.length > 0) {
      itemsText = '\n\nItems:\n';
      purchase.items.forEach(item => {
        itemsText += `• ${item.showTitle} x${item.quantity} - $${item.subtotal.toFixed(2)}\n`;
      });
    }

    await alert({
      title: `Purchase Details`,
      message: `🎫 Purchase #${purchase.id.slice(-8)}\n\nShow: ${purchase.showTitle}\nDate: ${this.formatDate(purchase.scheduleDateTime)}\nQuantity: ${purchase.quantity}\nTotal: $${purchase.totalAmount.toFixed(2)}\nPayment: ${purchase.paymentMethod}\nPurchased: ${this.formatDate(purchase.saleDate)}${itemsText}`,
      okButtonText: 'Close'
    });
  }

  async refresh(): Promise<void> {
    await this.loadPurchaseHistory();
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

  formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

  formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

}
