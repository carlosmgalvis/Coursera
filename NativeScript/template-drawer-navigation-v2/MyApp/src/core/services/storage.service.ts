import { Injectable } from '@angular/core';
import { ApplicationSettings, knownFolders, Folder, File, ImageSource } from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private appFolder: Folder;

  constructor() {
    this.appFolder = knownFolders.documents().getFolder('myapp_data');
    this.ensureValidData();
  }

  private async ensureValidData(): Promise<void> {
    try {
      // Check and fix corrupted data files
      const files = await this.appFolder.getEntities();
      for (const file of files) {
        if (file instanceof File && file.name.endsWith('.json')) {
          try {
            const content = await file.readText();
            JSON.parse(content);
          } catch (error) {
            console.log(`Removing corrupted file: ${file.name}`);
            await file.remove();
          }
        }
      }
    } catch (error) {
      console.error('Error ensuring valid data:', error);
    }
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
      const fileExists = await File.exists(file.path);
      if (fileExists) {
        const content = await file.readText();
        if (content && content.trim()) {
          return JSON.parse(content);
        }
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
      const fileExists = await File.exists(file.path);
      if (fileExists) {
        await file.remove();
      }
    } catch (error) {
      console.error('Error removing offline data:', error);
    }
  }

  async clearAllOfflineData(): Promise<void> {
    try {
      const entities = await this.appFolder.getEntities();
      for (const entity of entities) {
        if (entity instanceof File) {
          await entity.remove();
        }
      }
      console.log('All offline data cleared');
    } catch (error) {
      console.error('Error clearing offline data:', error);
    }
  }

  // Image storage methods
  async saveImage(imageAsset: any, fileName: string): Promise<string | null> {
    try {
      const documents = knownFolders.documents();
      let imagesFolder = documents.getFolder('user_images');

      const folderExists = await File.exists(imagesFolder.path);
      if (!folderExists) {
        imagesFolder = documents.getFolder('user_images');
      }

      const imageFile = imagesFolder.getFile(fileName);
      const imageSource = new ImageSource();

      if (imageAsset.android) {
        await imageSource.fromAsset(imageAsset.android);
      } else if (imageAsset.ios) {
        await imageSource.fromAsset(imageAsset.ios);
      } else if (imageAsset instanceof ImageSource) {
        return await imageSource.saveToFile(imageFile.path, 'jpg') ? imageFile.path : null;
      } else {
        await imageSource.fromFile(imageAsset);
      }

      const saved = await imageSource.saveToFile(imageFile.path, 'jpg');

      if (saved) {
        return imageFile.path;
      }

      return null;
    } catch (error) {
      console.error('Error saving image:', error);
      return null;
    }
  }

  async deleteImage(filePath: string): Promise<void> {
    try {
      const file = File.fromPath(filePath);
      const fileExists = await File.exists(file.path);
      if (fileExists) {
        await file.remove();
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }
}
