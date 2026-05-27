import { Component, OnInit, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '~/core/services/auth.service';

@Component({
  selector: 'general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {
  private router = inject(RouterExtensions);
  private authService = inject(AuthService);

  user: any = {};
  appVersion: string = '1.0.0';
  deviceInfo: string = '';

  ngOnInit(): void {
    this.loadUserData();
    this.getDeviceInfo();
  }

  loadUserData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = { ...currentUser };
    }
  }

  getDeviceInfo(): void {
    // You can add more device info here
    this.deviceInfo = 'Mobile App';
  }

  goBack(): void {
    this.router.back();
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
}
