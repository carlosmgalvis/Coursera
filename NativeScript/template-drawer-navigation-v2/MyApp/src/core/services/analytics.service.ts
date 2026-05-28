import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ApiService } from './api.service';
import { NetworkService } from './network.service';

export interface Sale {
  id: string;
  showTitle: string;
  quantity: number;
  totalAmount: number;
  scheduleDateTime: string;
  saleDate: string;
  paymentMethod: string;
}

export interface AnalyticsData {
  summary: {
    totalTransactions: number;
    totalTickets: number;
    totalSpent: number;
    averageTransaction: number;
  };
  salesByPeriod: any[];
  salesByShow: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private salesData: Sale[] = [];

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
    private networkService: NetworkService
  ) {}

  async loadSalesData(): Promise<void> {
    // Load from local storage first
    const localSales = await this.storageService.getOfflineData('sales');
    if (localSales && localSales.length > 0) {
      this.salesData = localSales;
    }

    // Fetch from server if online
    if (this.networkService.isConnected()) {
      try {
        const response: any = await this.apiService.getSalesHistory().toPromise();
        if (response && response.success) {
          this.salesData = response.data;
          await this.storageService.storeOfflineData('sales', this.salesData);
        }
      } catch (error) {
        console.error('Error fetching sales:', error);
      }
    }
  }

  getAnalytics(period: 'day' | 'week' | 'month', offset: number = 0): AnalyticsData {
    const filteredSales = this.filterSalesByPeriod(period, offset);

    return {
      summary: this.calculateSummary(filteredSales),
      salesByPeriod: this.groupSalesByPeriod(filteredSales, period),
      salesByShow: this.groupSalesByShow(filteredSales)
    };
  }

  private filterSalesByPeriod(period: 'day' | 'week' | 'month', offset: number): Sale[] {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;

    switch(period) {
      case 'day':
        startDate = new Date(now);
        startDate.setDate(now.getDate() + offset);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
        break;

      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() + (offset * 7));
        startDate.setDate(startDate.getDate() - startDate.getDay());
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
        break;

      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() + offset);
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        endDate.setDate(0);
        endDate.setHours(23, 59, 59, 999);
        break;

      default:
        return this.salesData;
    }

    return this.salesData.filter(sale => {
      const saleDate = new Date(sale.saleDate);
      return saleDate >= startDate && saleDate <= endDate;
    });
  }

  private calculateSummary(sales: Sale[]): any {
    if (sales.length === 0) {
      return {
        totalTransactions: 0,
        totalTickets: 0,
        totalSpent: 0,
        averageTransaction: 0
      };
    }

    const totalTransactions = sales.length;
    const totalTickets = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalSpent = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);

    return {
      totalTransactions,
      totalTickets,
      totalSpent,
      averageTransaction: totalSpent / totalTransactions
    };
  }

  private groupSalesByPeriod(sales: Sale[], period: 'day' | 'week' | 'month'): any[] {
    const grouped = new Map();

    sales.forEach(sale => {
      const date = new Date(sale.saleDate);
      let key: string;
      let displayKey: string;

      switch(period) {
        case 'day':
          key = date.toISOString().split('T')[0];
          displayKey = date.toLocaleDateString();
          break;
        case 'week':
          const weekNumber = this.getWeekNumber(date);
          key = `${date.getFullYear()}-W${weekNumber}`;
          displayKey = `Week ${weekNumber}`;
          break;
        case 'month':
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          displayKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });
          break;
        default:
          key = date.toISOString().split('T')[0];
          displayKey = date.toLocaleDateString();
      }

      if (!grouped.has(key)) {
        grouped.set(key, {
          period: displayKey,
          key: key,
          transactionCount: 0,
          totalTickets: 0,
          totalSales: 0
        });
      }

      const group = grouped.get(key);
      group.transactionCount += 1;
      group.totalTickets += sale.quantity;
      group.totalSales += sale.totalAmount;
    });

    // Sort by key (date)
    return Array.from(grouped.values()).sort((a, b) => a.key.localeCompare(b.key));
  }

  private groupSalesByShow(sales: Sale[]): any[] {
    const grouped = new Map();

    sales.forEach(sale => {
      if (!grouped.has(sale.showTitle)) {
        grouped.set(sale.showTitle, {
          showTitle: sale.showTitle,
          totalTickets: 0,
          totalSales: 0,
          timesPurchased: 0
        });
      }

      const group = grouped.get(sale.showTitle);
      group.totalTickets += sale.quantity;
      group.totalSales += sale.totalAmount;
      group.timesPurchased += 1;
    });

    return Array.from(grouped.values()).sort((a, b) => b.totalSales - a.totalSales);
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  getDateRangeLabel(period: 'day' | 'week' | 'month', offset: number): string {
    const now = new Date();
    let label = '';

    switch(period) {
      case 'day':
        const dayDate = new Date(now);
        dayDate.setDate(now.getDate() + offset);
        label = dayDate.toLocaleDateString();
        break;
      case 'week':
        if (offset === 0) {
          label = 'Current Week';
        } else if (offset === -1) {
          label = 'Previous Week';
        } else if (offset === 1) {
          label = 'Next Week';
        } else {
          const weekDate = new Date(now);
          weekDate.setDate(now.getDate() + (offset * 7));
          label = `Week of ${weekDate.toLocaleDateString()}`;
        }
        break;
      case 'month':
        const monthDate = new Date(now);
        monthDate.setMonth(now.getMonth() + offset);
        label = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        break;
    }

    return label;
  }

  canGoForward(period: 'day' | 'week' | 'month', offset: number): boolean {
    const now = new Date();

    switch(period) {
      case 'day':
        const dayDate = new Date(now);
        dayDate.setDate(now.getDate() + offset);
        return dayDate <= now;
      case 'week':
        const weekDate = new Date(now);
        weekDate.setDate(now.getDate() + (offset * 7));
        return weekDate <= now;
      case 'month':
        const monthDate = new Date(now);
        monthDate.setMonth(now.getMonth() + offset);
        return monthDate <= now;
      default:
        return true;
    }
  }
}
