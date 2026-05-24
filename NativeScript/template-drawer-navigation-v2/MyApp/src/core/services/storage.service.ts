import { Injectable } from '@angular/core';
import { ApplicationSettings, knownFolders, Folder, File } from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private appFolder: Folder;

  constructor() {
    this.appFolder = knownFolders.documents().getFolder('myapp_data');
  }

  setItem(key: string, value: any): void {
    try {
      ApplicationSettings.setString(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const value = ApplicationSettings.getString(key);
      return value ? JSON.parse(value) as T : null;
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

  // Offline data storage methods
  async storeOfflineData(key: string, data: any): Promise<void> {
    try {
      const file = this.appFolder.getFile(`${key}.json`);
      await file.writeText(JSON.stringify(data));
    } catch (error) {
      console.error('Error storing offline data:', error);
    }
  }

  async getOfflineData(key: string): Promise<any> {
    try {
      const file = this.appFolder.getFile(`${key}.json`);
      const exists = await File.exists(file.path);
      if (exists) {
        const content = await file.readText();
        return JSON.parse(content);
      }
      return null;
    } catch (error) {
      console.error('Error reading offline data:', error);
      return null;
    }
  }

  async removeOfflineData(key: string): Promise<void> {
    try {
      const file = this.appFolder.getFile(`${key}.json`);
      const exists = await File.exists(file.path);
      if (exists) {
        await file.remove();
      }
    } catch (error) {
      console.error('Error removing offline data:', error);
    }
  }
}
