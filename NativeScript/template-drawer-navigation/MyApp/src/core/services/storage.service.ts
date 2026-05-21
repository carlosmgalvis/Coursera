import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(key: string, value: any): void {
    try {
      const jsonValue = JSON.stringify(value);
      ApplicationSettings.setString(key, jsonValue);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const value = ApplicationSettings.getString(key);
      if (value) {
        return JSON.parse(value) as T;
      }
      return null;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      ApplicationSettings.remove(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  }

  clear(): void {
    try {
      ApplicationSettings.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  hasKey(key: string): boolean {
    return ApplicationSettings.hasKey(key);
  }
}
