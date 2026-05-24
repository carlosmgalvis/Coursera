import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { Component, OnInit, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ApiService } from '~/core/services/api.service';
import { StorageService } from '~/core/services/storage.service';
import { NetworkService } from '~/core/services/network.service';
import { alert } from '@nativescript/core';

interface AnalyticsData {
  summary: {
    totalTransactions: number;
    totalTickets: number;
    totalSpent: number;
    averageTransaction: number;
  };
  salesByPeriod: any[];
  salesByShow: any[];
}

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  private apiService = inject(ApiService);
  private storageService = inject(StorageService);
  private networkService = inject(NetworkService);
  private router = inject(RouterExtensions);

  analytics: AnalyticsData | null = null;
  selectedPeriod: 'day' | 'week' | 'month' = 'month';
  isLoading: boolean = true;
  showAnalytics: boolean = true;

  ngOnInit(): void {
    this.loadAnalytics();
  }

  async loadAnalytics(): Promise<void> {
    this.isLoading = true;

    if (this.networkService.isConnected()) {
      try {
        const response: any = await this.apiService.getSalesAnalytics().toPromise();
        if (response && response.success) {
          this.analytics = response.data;
          await this.storageService.storeOfflineData('analytics', this.analytics);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        // Load from cache
        const cached = await this.storageService.getOfflineData('analytics');
        if (cached) {
          this.analytics = cached;
        }
      }
    } else {
      // Load from cache
      const cached = await this.storageService.getOfflineData('analytics');
      if (cached) {
        this.analytics = cached;
      }
    }

    this.isLoading = false;
  }


  changePeriod(period: 'day' | 'week' | 'month'): void {
    this.selectedPeriod = period;
    // Re-process data based on period if needed
  }

  getPeriodData(): any[] {
    if (!this.analytics) return [];
    return this.analytics.salesByPeriod || [];
  }

  getTopShows(): any[] {
    if (!this.analytics) return [];
    return (this.analytics.salesByShow || []).slice(0, 5);
  }

  getTotalSpent(): number {
    return this.analytics?.summary?.totalSpent || 0;
  }

  getTotalTickets(): number {
    return this.analytics?.summary?.totalTickets || 0;
  }

  getTotalTransactions(): number {
    return this.analytics?.summary?.totalTransactions || 0;
  }

  getAverageTransaction(): number {
    return this.analytics?.summary?.averageTransaction || 0;
  }

  goToMaster(): void {
    this.router.navigate(['/master']);
  }

  formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

}
