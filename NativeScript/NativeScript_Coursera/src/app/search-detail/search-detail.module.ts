import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { SearchDetailRoutingModule } from './search-detail-routing.module'
import { SearchDetailComponent } from './search-detail.component'

@NgModule({
  imports: [
    NativeScriptCommonModule,
    ReactiveFormsModule,
    FormsModule,
    SearchDetailRoutingModule
  ],
  declarations: [SearchDetailComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SearchDetailModule {}
