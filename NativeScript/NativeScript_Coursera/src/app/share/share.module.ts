import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptFormsModule } from '@nativescript/angular';
import { ShareRoutingModule } from './share-routing.module';
import { ShareComponent } from './share.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    ShareRoutingModule
  ],
  declarations: [
    ShareComponent
  ],
  exports: [
    ShareComponent
  ]
})
export class ShareModule { }