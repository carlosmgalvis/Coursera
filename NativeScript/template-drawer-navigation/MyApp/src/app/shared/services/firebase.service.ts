import { Injectable } from '@angular/core';
import { Application } from '@nativescript/core';
import * as applicationSettings from '@nativescript/core/application-settings';

export interface FirebaseNotification {
  title: string;
  body: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly FIREBASE_API_KEY_KEY = 'firebase_api_key';
  private readonly FIREBASE_PROJECT_ID_KEY = 'firebase_project_id';
  private readonly FIREBASE_SENDER_ID_KEY = 'firebase_sender_id';

  constructor() {}

  getApiKey(): string {
    return applicationSettings.getString(this.FIREBASE_API_KEY_KEY, 'TU_API_KEY_AQUI');
  }

  setApiKey(apiKey: string): void {
    applicationSettings.setString(this.FIREBASE_API_KEY_KEY, apiKey);
  }

  getProjectId(): string {
    return applicationSettings.getString(this.FIREBASE_PROJECT_ID_KEY, 'TU_PROJECT_ID_AQUI');
  }

  setProjectId(projectId: string): void {
    applicationSettings.setString(this.FIREBASE_PROJECT_ID_KEY, projectId);
  }

  getSenderId(): string {
    return applicationSettings.getString(this.FIREBASE_SENDER_ID_KEY, 'TU_SENDER_ID_AQUI');
  }

  setSenderId(senderId: string): void {
    applicationSettings.setString(this.FIREBASE_SENDER_ID_KEY, senderId);
  }

  showNotificationToast(notification: FirebaseNotification): void {
    if (Application.android) {
      const toast = android.widget.Toast.makeText(
        Application.android.context,
        `${notification.title}: ${notification.body}`,
        android.widget.Toast.LENGTH_LONG
      );
      toast.show();
    } else if (Application.ios) {
      console.log(`Firebase Notification: ${notification.title} - ${notification.body}`);
    }
  }

  initializeFirebase(): void {
    const apiKey = this.getApiKey();
    const projectId = this.getProjectId();
    const senderId = this.getSenderId();
    console.log(`Firebase initialized with Project ID: ${projectId}, Sender ID: ${senderId}`);
  }
}