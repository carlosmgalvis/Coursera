import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlickModel, ShowSchedule } from '../models/flick.model';
import { StorageService } from './storage.service';
import { NetworkService } from './network.service';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlickService {
  private flicks: FlickModel[] = [];
  private favoritesSubject = new BehaviorSubject<number[]>([]);
  private token: string | null = null;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private networkService: NetworkService
  ) {
    this.token = this.storageService.getItem<string>('auth_token');
    this.loadLocalData();
  }

  private async loadLocalData(): Promise<void> {
    // Load cached shows
    const cachedShows = await this.storageService.getOfflineData('shows');
    if (cachedShows) {
      this.flicks = cachedShows;
    }

    // Load favorites
    const favorites = this.storageService.getItem<number[]>('favorites') || [];
    this.favoritesSubject.next(favorites);

    // Try to fetch fresh data if online
    if (this.networkService.isConnected() && this.token) {
      await this.fetchShowsFromServer();
      await this.fetchFavoritesFromServer();
    }
  }

  async fetchShowsFromServer(): Promise<void> {
    if (!this.networkService.isConnected() || !this.token) return;

    try {
      const response: any = await this.apiService.getShows().toPromise();
      if (response.success) {
        this.flicks = response.data;
        await this.storageService.storeOfflineData('shows', this.flicks);
      }
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  }

  async fetchFavoritesFromServer(): Promise<void> {
    if (!this.networkService.isConnected() || !this.token) return;

    try {
      const response: any = await this.apiService.getFavorites().toPromise();
      if (response.success) {
        const favorites = response.data.map((show: any) => show.id);
        this.storageService.setItem('favorites', favorites);
        this.favoritesSubject.next(favorites);

        // Update isFavorite flag in flicks
        this.flicks.forEach(flick => {
          flick.isFavorite = favorites.includes(flick.id);
        });
        await this.storageService.storeOfflineData('shows', this.flicks);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }

  getFlicks(): FlickModel[] {
    return this.flicks;
  }

  getUpcomingShows(): FlickModel[] {
    const today = new Date();
    return this.flicks.filter(flick =>
      flick.schedules?.some(schedule => new Date(schedule.scheduleDateTime) >= today)
    );
  }

  getFlickById(id: number): FlickModel | undefined {
    return this.flicks.find(flick => flick.id === id);
  }

  getFavorites(): Observable<number[]> {
    return this.favoritesSubject.asObservable();
  }

  isFavorite(showId: number): boolean {
    const favorites = this.storageService.getItem<number[]>('favorites') || [];
    return favorites.includes(showId);
  }

  async toggleFavorite(showId: number): Promise<boolean> {
    if (!this.networkService.isConnected()) {
      // Offline: update local only
      const favorites = this.storageService.getItem<number[]>('favorites') || [];
      const index = favorites.indexOf(showId);
      let isFavorite = false;

      if (index === -1) {
        favorites.push(showId);
        isFavorite = true;
      } else {
        favorites.splice(index, 1);
        isFavorite = false;
      }

      this.storageService.setItem('favorites', favorites);
      this.favoritesSubject.next(favorites);

      // Update local flick data
      const flick = this.flicks.find(f => f.id === showId);
      if (flick) {
        flick.isFavorite = isFavorite;
      }

      return isFavorite;
    }

    try {
      const response: any = await this.apiService.toggleFavorite(showId).toPromise();
      if (response.success) {
        // Update local storage
        const favorites = this.storageService.getItem<number[]>('favorites') || [];
        const index = favorites.indexOf(showId);

        if (response.data.isFavorite && index === -1) {
          favorites.push(showId);
        } else if (!response.data.isFavorite && index !== -1) {
          favorites.splice(index, 1);
        }

        this.storageService.setItem('favorites', favorites);
        this.favoritesSubject.next(favorites);

        // Update local flick data
        const flick = this.flicks.find(f => f.id === showId);
        if (flick) {
          flick.isFavorite = response.data.isFavorite;
        }

        return response.data.isFavorite;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
    return false;
  }

  async getShowSchedules(showId: number): Promise<ShowSchedule[]> {
    const show = this.getFlickById(showId);
    if (show && show.schedules) {
      const today = new Date();
      return show.schedules.filter(schedule => new Date(schedule.scheduleDateTime) >= today);
    }
    return [];
  }
}
