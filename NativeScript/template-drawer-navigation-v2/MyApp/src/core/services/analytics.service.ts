import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Sale } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  
  constructor(private storageService: StorageService) {}

  async getSalesAnalytics(period: 'day' | 'week' | 'month'): Promise<any> {
    const sales = await this.storageService.getOfflineData('sales') || [];
    
    const groupedData = this.groupSalesByPeriod(sales, period);
    const byShow = this.groupSalesByShow(sales);
    const summary = this.calculateSummary(sales);
    
    return {
      summary,
      salesByPeriod: groupedData,
      salesByShow: byShow
    };
  }

  private groupSalesByPeriod(sales: any[], period: string): any[] {
    const grouped = new Map();
    
    sales.forEach(sale => {
      const date = new Date(sale.saleDate);
      let key = '';
      
      switch(period) {
        case 'day':
          key = date.toISOString().split('T')[0];
          break;
        case 'week':
          const weekNumber = this.getWeekNumber(date);
          key = `${date.getFullYear()}-W${weekNumber}`;
          break;
        case 'month':
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          break;
      }
      
      if (!grouped.has(key)) {
        grouped.set(key, {
          period: key,
          transactionCount: 0,
          totalTickets: 0,
          totalSales: 0
        });
      }
      
      const group = grouped.get(key);
      group.transactionCount += 1;
      group.totalTickets += sale.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      group.totalSales += sale.totalAmount;
    });
    
    return Array.from(grouped.values()).sort((a, b) => a.period.localeCompare(b.period));
  }

  private groupSalesByShow(sales: any[]): any[] {
    const grouped = new Map();
    
    sales.forEach(sale => {
      sale.items?.forEach(item => {
        if (!grouped.has(item.flick.id)) {
          grouped.set(item.flick.id, {
            showId: item.flick.id,
            showTitle: item.flick.title,
            totalTickets: 0,
            totalSales: 0,
            timesPurchased: 0
          });
        }
        
        const group = grouped.get(item.flick.id);
        group.totalTickets += item.quantity;
        group.totalSales += item.subtotal;
        group.timesPurchased += 1;
      });
    });
    
    return Array.from(grouped.values()).sort((a, b) => b.totalSales - a.totalSales);
  }

  private calculateSummary(sales: any[]): any {
    if (sales.length === 0) {
      return {
        totalTransactions: 0,
        totalTickets: 0,
        totalSpent: 0,
        averageTransaction: 0
      };
    }
    
    const totalTransactions = sales.length;
    const totalTickets = sales.reduce((sum, sale) => 
      sum + (sale.items?.reduce((s, item) => s + item.quantity, 0) || 0), 0);
    const totalSpent = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    
    return {
      totalTransactions,
      totalTickets,
      totalSpent,
      averageTransaction: totalSpent / totalTransactions
    };
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
}