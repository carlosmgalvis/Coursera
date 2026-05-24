import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { NetworkService } from './network.service';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private deviceId: string;

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private networkService: NetworkService
  ) {
    this.deviceId = this.getDeviceId();
    this.loadUserFromStorage();
  }

  private getDeviceId(): string {
    let deviceId = this.storageService.getItem<string>('device_id');
    if (!deviceId) {
      deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      this.storageService.setItem('device_id', deviceId);
    }
    return deviceId;
  }

  private async loadUserFromStorage(): Promise<void> {
    const user = this.storageService.getItem<User>('user');
    const token = this.storageService.getItem<string>('auth_token');

    if (user && token) {
      this.currentUserSubject.next(user);

      // Try to auto-login with device if online
      if (this.networkService.isConnected()) {
        await this.loginWithDevice();
      }
    }
  }

  async login(credentials: LoginCredentials): Promise<User | null> {
    try {
      const data = { ...credentials, deviceId: this.deviceId };
      const response: any = await this.apiService.login(data).toPromise();

      if (response && response.success) {
        const user = response.data;
        this.storageService.setItem('user', user);
        this.storageService.setItem('auth_token', user.token);
        this.currentUserSubject.next(user);
        return user;
      }
    } catch (error: any) {
      console.error('Login error:', error);
    }
    return null;
  }

  async register(data: RegisterData): Promise<User | null> {
    try {
      const registerData = { ...data, deviceId: this.deviceId };
      const response: any = await this.apiService.register(registerData).toPromise();

      if (response && response.success) {
        const user = response.data;
        this.storageService.setItem('user', user);
        this.storageService.setItem('auth_token', user.token);
        this.currentUserSubject.next(user);
        return user;
      }
    } catch (error: any) {
      console.error('Registration error:', error);
    }
    return null;
  }

  async loginWithDevice(): Promise<User | null> {
    if (!this.networkService.isConnected()) {
      return this.currentUserSubject.value;
    }

    try {
      const response: any = await this.apiService.loginWithDevice(this.deviceId).toPromise();

      if (response && response.success) {
        const user = response.data;
        this.storageService.setItem('user', user);
        this.storageService.setItem('auth_token', user.token);
        this.currentUserSubject.next(user);
        return user;
      }
    } catch (error: any) {
      console.error('Device login error:', error);
    }
    return null;
  }

  logout(): void {
    this.storageService.removeItem('user');
    this.storageService.removeItem('auth_token');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserObservable() {
    return this.currentUserSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
