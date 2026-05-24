import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    SearchRoutingModule,
    NativeScriptUISideDrawerModule
  ],
  declarations: [SearchComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
