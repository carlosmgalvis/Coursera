import { Component, OnInit } from '@angular/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { ConfigService } from '../shared/services/config.service'
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'Settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder
  ) {
    // Initialize the form
    this.settingsForm = this.fb.group({
      ngrokUrl: [this.configService.getNgrokUrl()],
      username: [this.configService.getUsername()]
    });
  }

  ngOnInit(): void {
    // Form is already initialized with current values in constructor
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }

  onSave(): void {
    if (this.settingsForm.valid) {
      const { ngrokUrl, username } = this.settingsForm.value;
      this.configService.setNgrokUrl(ngrokUrl);
      this.configService.setUsername(username);
      alert('Configuracion guardada correctamente');
    }
  }
}
