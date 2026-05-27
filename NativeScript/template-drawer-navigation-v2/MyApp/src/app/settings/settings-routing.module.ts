import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { SettingsComponent } from './settings.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdvancedSettingsComponent } from './advanced-settings/advanced-settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
  { path: 'general-info', component: GeneralInfoComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'advanced-settings', component: AdvancedSettingsComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule {}
