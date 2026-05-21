import { Component, OnInit, inject } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { FlickService } from '~/core/services/flick.service'

import { ItemEventData } from '@nativescript/core'
import { RouterExtensions } from '@nativescript/angular'

@Component({
  selector: 'Master',
  templateUrl: './master.component.html',
})
export class MasterComponent implements OnInit {
  flickService = inject(FlickService)
  router = inject(RouterExtensions);
  //constructor() {
    // Use the component constructor to inject providers.
  //}

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  // Add a getter to access the service in the template
  getFlicks() {
    return this.flickService?.getFlicks() || [];
  }
  onFlickTap(args: ItemEventData): void {
    const flick = this.flickService.getFlicks()[args.index];
    console.log('Navigating to details with id:', flick.id); // Debug log
    this.router.navigate(['/details', flick.id]);
  }
}
