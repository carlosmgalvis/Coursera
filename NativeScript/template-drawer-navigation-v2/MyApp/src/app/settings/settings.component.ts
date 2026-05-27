import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { Component, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  private router = inject(RouterExtensions);

  goToGeneralInfo(): void {
    this.router.navigate(['/settings/general-info']);
  }

  goToUserProfile(): void {
    this.router.navigate(['/settings/user-profile']);
  }

  goToAdvancedSettings(): void {
    this.router.navigate(['/settings/advanced-settings']);
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
  goBack(): void {
    this.router.back();
  }
}
