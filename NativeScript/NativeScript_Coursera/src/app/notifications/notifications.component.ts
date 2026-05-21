import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as application from '@nativescript/core';
import { FirebaseService, FirebaseNotification } from '../shared/services/firebase.service';

@Component({
  selector: 'Notifications',
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent implements OnInit {
  notifications: FirebaseNotification[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.initializeFirebaseNotifications();
  }

  initializeFirebaseNotifications(): void {
    this.firebaseService.initializeFirebase();
    
    this.notifications = [
      { title: 'Bienvenido', body: 'Gracias por usar nuestra aplicación' },
      { title: 'Nueva función', body: 'Ahora puedes compartir imágenes directamente' },
      { title: 'Recordatorio', body: 'No olvides revisar tus favoritos' }
    ];
    
    this.notifications.forEach(notification => {
      this.firebaseService.showNotificationToast(notification);
    });
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>application.getRootView();
    sideDrawer.showDrawer();
  }

  testNotification(): void {
    const testNotification: FirebaseNotification = {
      title: 'Notificación de prueba',
      body: 'Esta es una notificación de prueba desde la app'
    };
    this.firebaseService.showNotificationToast(testNotification);
    this.notifications.unshift(testNotification);
  }
}