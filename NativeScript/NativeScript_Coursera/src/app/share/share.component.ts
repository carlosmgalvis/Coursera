import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as application from '@nativescript/core';
import * as socialShare from 'nativescript-social-share';
import { takePicture, requestCameraPermissions } from '@nativescript/camera';
import { ImageSource } from '@nativescript/core';

@Component({
  selector: 'Share',
  templateUrl: './share.component.html',
})
export class ShareComponent implements OnInit {
  textToShare: string = '';
  capturedImagePath: string = '';
  hasImage: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>application.getRootView();
    sideDrawer.showDrawer();
  }

  shareText(): void {
    if (this.textToShare.trim()) {
      socialShare.shareText(this.textToShare);
      this.showToast('Texto compartido exitosamente');
    } else {
      this.showToast('Por favor ingresa texto para compartir');
    }
  }

  takePicture(): void {
    requestCameraPermissions().then(
      (result) => {
        if (result) {
          takePicture({ width: 300, height: 300, keepAspectRatio: true })
            .then((imageAsset: any) => {
              this.capturedImagePath = imageAsset.android;
              this.hasImage = true;
              this.showToast('Foto tomada exitosamente');
            })
            .catch((error) => {
              console.error('Error taking picture:', error);
              this.showToast('Error al tomar la foto');
            });
        } else {
          this.showToast('Permiso de cámara denegado');
        }
      },
      (error) => {
        console.error('Camera permission error:', error);
        this.showToast('Error al solicitar permiso de cámara');
      }
    );
  }

  shareImage(): void {
    if (this.hasImage && this.capturedImagePath) {
      socialShare.shareImage(this.capturedImagePath, 'Mira esta foto');
      this.showToast('Imagen compartida exitosamente');
    } else {
      this.showToast('Primero toma una foto para compartir');
    }
  }

  shareTextAndImage(): void {
    if (this.hasImage && this.capturedImagePath && this.textToShare.trim()) {
      socialShare.shareText(this.textToShare + ' - Imagen adjunta');
      socialShare.shareImage(this.capturedImagePath);
      this.showToast('Texto e imagen compartidos exitosamente');
    } else {
      this.showToast('Por favor ingresa texto y toma una foto');
    }
  }

  private showToast(message: string): void {
    if (application.android) {
      const toast = android.widget.Toast.makeText(
        application.android.context,
        message,
        android.widget.Toast.LENGTH_SHORT
      );
      toast.show();
    } else if (application.ios) {
      console.log('Toast:', message);
    }
  }
}