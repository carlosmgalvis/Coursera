import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = '';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.loadConfig();
  }

  async loadConfig(): Promise<void> {
    const config = this.storageService.getItem<any>('api_config');
    if (config && config.baseUrl && config.port) {
      this.baseUrl = `${config.baseUrl}:${config.port}/api`;
    } else {
      // Default configuration
      this.baseUrl = 'https://retiree-doorknob-nutcase.ngrok-free.dev/api';
    }
    console.log('API Service configured with URL:', this.baseUrl);
  }

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getItem<string>('auth_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  // Auth endpoints
  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/users/login`, credentials);
  }

  register(userData: any) {
    return this.http.post(`${this.baseUrl}/users/register`, userData);
  }

  loginWithDevice(deviceId: string) {
    return this.http.post(`${this.baseUrl}/users/login/device`, { deviceId });
  }

  getUserData() {
    return this.http.get(`${this.baseUrl}/users/me`, { headers: this.getHeaders() });
  }

  // Shows endpoints
  getShows() {
    return this.http.get(`${this.baseUrl}/shows`, { headers: this.getHeaders() });
  }

  getShowById(id: number) {
    return this.http.get(`${this.baseUrl}/shows/${id}`, { headers: this.getHeaders() });
  }

  getFavorites() {
    return this.http.get(`${this.baseUrl}/shows/favorites`, { headers: this.getHeaders() });
  }

  toggleFavorite(showId: number) {
    return this.http.patch(`${this.baseUrl}/shows/${showId}/favorite`, {}, { headers: this.getHeaders() });
  }

  // Sales endpoints
  createSale(saleData: any) {
    return this.http.post(`${this.baseUrl}/sales`, saleData, { headers: this.getHeaders() });
  }

  getSalesHistory() {
    return this.http.get(`${this.baseUrl}/sales/history`, { headers: this.getHeaders() });
  }

  getSalesAnalytics() {
    return this.http.get(`${this.baseUrl}/sales/analytics`, { headers: this.getHeaders() });
  }
}
