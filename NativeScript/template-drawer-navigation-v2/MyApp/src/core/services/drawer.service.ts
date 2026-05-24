import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private drawerToggleSubject = new BehaviorSubject<boolean>(false);

  toggleDrawer(): void {
    this.drawerToggleSubject.next(true);
  }

  getDrawerToggle() {
    return this.drawerToggleSubject.asObservable();
  }
}
