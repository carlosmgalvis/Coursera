import { NgModule } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'
import { LongPressDirective } from './directives/long-press.directive'
import { MinLengthDirective } from './directives/min-length.directive'

@NgModule({
  imports: [NativeScriptCommonModule],
  declarations: [LongPressDirective, MinLengthDirective],
  exports: [LongPressDirective, MinLengthDirective]
})
export class SharedModule {}
