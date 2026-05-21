import { Injectable } from '@angular/core';
import * as applicationSettings from '@nativescript/core/application-settings';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly NGROK_URL_KEY = 'ngrok_url';
  private readonly USERNAME_KEY = 'username';

  getNgrokUrl(): string {
    const url = applicationSettings.getString(this.NGROK_URL_KEY);
    return url || 'http://localhost:3000'; // Default to local development
  }

  setNgrokUrl(url: string): void {
    applicationSettings.setString(this.NGROK_URL_KEY, url);
  }

  getUsername(): string {
    return applicationSettings.getString(this.USERNAME_KEY, '');
  }

  setUsername(username: string): void {
    applicationSettings.setString(this.USERNAME_KEY, username);
  }
}