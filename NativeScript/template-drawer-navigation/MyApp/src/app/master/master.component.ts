import { Component, OnInit, inject } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { FlickService } from '~/core/services/flick.service'

@Component({
  selector: 'Master',
  templateUrl: './master.component.html',
})
export class MasterComponent implements OnInit {
  private flickService = inject(FlickService)

  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  // Add a getter to access the service in the template
  getFlicks() {
    return this.flickService.getFlicks();
  }
}
