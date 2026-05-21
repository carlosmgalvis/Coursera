import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptFormsModule } from '@nativescript/angular';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NotificationsRoutingModule
  ],
  declarations: [
    NotificationsComponent
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationsModule { }