import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { NetworkService } from './network.service';
import { alert } from '@nativescript/core';

interface SyncResponse {
  success: boolean;
  data: {
    favorites?: number[];
    sales?: any[];
    syncDate?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SyncService {
//  private baseUrl = 'http://10.0.2.2:3000/api';
  private baseUrl = 'https://retiree-doorknob-nutcase.ngrok-free.dev/api';
  private syncQueue: any[] = [];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private networkService: NetworkService
  ) {
    this.loadSyncQueue();
  }

  private async loadSyncQueue(): Promise<void> {
    this.syncQueue = await this.storageService.getOfflineData('sync_queue') || [];
  }

  private async saveSyncQueue(): Promise<void> {
    await this.storageService.storeOfflineData('sync_queue', this.syncQueue);
  }

  async addToSyncQueue(operation: string, data: any): Promise<void> {
    this.syncQueue.push({
      id: Date.now(),
      operation,
      data,
      timestamp: new Date().toISOString()
    });
    await this.saveSyncQueue();

    // Try to sync immediately if online
    if (this.networkService.isConnected()) {
      await this.sync();
    }
  }

  async sync(): Promise<void> {
    if (!this.networkService.isConnected()) {
      console.log('No internet connection. Sync deferred.');
      return;
    }

    if (this.syncQueue.length === 0) {
      return;
    }

    const token = this.storageService.getItem<string>('auth_token');
    if (!token) {
      console.log('No auth token. Sync skipped.');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    const failedOperations = [];

    for (const operation of this.syncQueue) {
      try {
        switch (operation.operation) {
          case 'sale':
            await this.http.post(`${this.baseUrl}/sales`, operation.data, { headers }).toPromise();
            break;
          case 'favorite':
            await this.http.patch(`${this.baseUrl}/shows/${operation.data.showId}/favorite`, {}, { headers }).toPromise();
            break;
        }
      } catch (error) {
        console.error('Sync failed for operation:', operation);
        failedOperations.push(operation);
      }
    }

    // Keep only failed operations
    this.syncQueue = failedOperations;
    await this.saveSyncQueue();

    if (failedOperations.length === 0) {
      console.log('All operations synced successfully');
    } else {
      console.log(`${failedOperations.length} operations failed to sync`);
    }
  }

  async syncUserData(): Promise<void> {
    if (!this.networkService.isConnected()) {
      console.log('No internet connection. Cannot sync user data.');
      return;
    }

    const token = this.storageService.getItem<string>('auth_token');
    if (!token) {
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const lastSync = this.storageService.getItem<string>('last_sync');

      const response = await this.http.post(`${this.baseUrl}/users/sync`,
        { lastSync },
        { headers }
      ).toPromise() as SyncResponse;

      if (response && response.success) {
        // Update local data with synced data
        if (response.data && response.data.favorites) {
          this.storageService.setItem('favorites', response.data.favorites);
        }
        if (response.data && response.data.sales) {
          const existingSales = this.storageService.getItem<any[]>('sales') || [];
          const updatedSales = [...response.data.sales, ...existingSales];
          this.storageService.setItem('sales', updatedSales);
        }
        if (response.data && response.data.syncDate) {
          this.storageService.setItem('last_sync', response.data.syncDate);
        }
      }
    } catch (error) {
      console.error('Error syncing user data:', error);
    }
  }
}
