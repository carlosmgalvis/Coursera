import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { Component, OnInit, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AnalyticsService, AnalyticsData } from '~/core/services/analytics.service';
import { alert } from '@nativescript/core';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  private analyticsService = inject(AnalyticsService);
  private router = inject(RouterExtensions);

  analyticsData: AnalyticsData | null = null;
  selectedPeriod: 'day' | 'week' | 'month' = 'month';
  currentOffset: number = 0;
  isLoading: boolean = true;
  dateRangeLabel: string = '';

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    this.isLoading = true;
    await this.analyticsService.loadSalesData();
    this.updateAnalytics();
    this.isLoading = false;
  }

  updateAnalytics(): void {
    this.analyticsData = this.analyticsService.getAnalytics(this.selectedPeriod, this.currentOffset);
    this.dateRangeLabel = this.analyticsService.getDateRangeLabel(this.selectedPeriod, this.currentOffset);
  }

  changePeriod(period: 'day' | 'week' | 'month'): void {
    this.selectedPeriod = period;
    this.currentOffset = 0;
    this.updateAnalytics();
  }

  goBack(): void {
    this.currentOffset--;
    this.updateAnalytics();
  }

  goForward(): void {
    if (this.analyticsService.canGoForward(this.selectedPeriod, this.currentOffset - 1)) {
      this.currentOffset--;
      this.updateAnalytics();
    } else {
      alert({
        title: 'Cannot Go Forward',
        message: 'You cannot view future dates.',
        okButtonText: 'OK'
      });
    }
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

  getPeriodData(): any[] {
    return this.analyticsData?.salesByPeriod || [];
  }

  getTopShows(): any[] {
    return (this.analyticsData?.salesByShow || []).slice(0, 5);
  }

  getTotalSpent(): number {
    return this.analyticsData?.summary?.totalSpent || 0;
  }

  getTotalTickets(): number {
    return this.analyticsData?.summary?.totalTickets || 0;
  }

  getTotalTransactions(): number {
    return this.analyticsData?.summary?.totalTransactions || 0;
  }

  getAverageTransaction(): number {
    return this.analyticsData?.summary?.averageTransaction || 0;
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
  refresh(): void {
    this.loadData();
  }
}
