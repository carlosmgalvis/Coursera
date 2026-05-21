import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { SearchRoutingModule } from './search-routing.module'
import { SearchComponent } from './search.component'
import { SearchService } from './search.service'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    ReactiveFormsModule,
    FormsModule,
    SearchRoutingModule
  ],
  declarations: [SearchComponent],
  providers: [SearchService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SearchModule {}
