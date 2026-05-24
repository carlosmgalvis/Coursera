import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { AuthService } from '~/core/services/auth.service';
import { FlickService } from '~/core/services/flick.service';
import { SyncService } from '~/core/services/sync.service';
import { NetworkService } from '~/core/services/network.service';
import { DrawerService } from '~/core/services/drawer.service';
import { confirm } from '@nativescript/core';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private flickService = inject(FlickService);
  private syncService = inject(SyncService);
  private networkService = inject(NetworkService);
  private router = inject(RouterExtensions);
  private drawerService = inject(DrawerService);

  //@ViewChild('drawer') drawer: RadSideDrawer;

  sideDrawerTransition: any = null;
  selectedComponent: string = '';
  userName: string = '';
  userEmail: string = '';

  ngOnInit(): void {
    this.checkAuth();
    this.loadUserInfo();

    // Listen for drawer toggle events
//    this.drawerService.getDrawerToggle().subscribe(() => {
//      if (this.drawer) {
//        this.drawer.showDrawer();
//      }
//    });

    // Monitor network for sync
    setInterval(() => {
      if (this.networkService.isConnected() && this.authService.isLoggedIn()) {
        this.syncService.sync();
        this.syncService.syncUserData();
      }
    }, 30000);
  }

// Add these methods to load user data
loadUserInfo(): void {
  const user = this.authService.getCurrentUser();
  if (user) {
    this.userName = user.name || 'User Name';
    this.userEmail = user.email || '';
  }
}

// Call this after login
async checkAuth(): Promise<void> {
  if (this.authService.isLoggedIn()) {
    await this.flickService.fetchShowsFromServer();
    await this.flickService.fetchFavoritesFromServer();
    this.loadUserInfo(); // Add this line
    this.router.navigate(['/master'], { clearHistory: true });
  } else {
    this.router.navigate(['/login'], { clearHistory: true });
  }
}

  isComponentSelected(component: string): boolean {
    return this.selectedComponent === component;
  }

  onNavItemTap(component: string): void {
    this.selectedComponent = component;
    this.router.navigate([component]);

  //  if (this.drawer) {
  //    this.drawer.closeDrawer();
  //  }
  }

  async onLogout(): Promise<void> {
    const result = await confirm({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      okButtonText: 'Logout',
      cancelButtonText: 'Cancel'
    });

    if (result) {
      this.authService.logout();
      this.router.navigate(['/login'], { clearHistory: true });
    }
  }
}
