import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { NativeScriptCommonModule } from "@nativescript/angular";
import { SalesHistoryRoutingModule } from "./sales-history-routing.module";
import { SalesHistoryComponent } from "./sales-history.component";

const routes: Routes = [
  { path: '', component: SalesHistoryComponent }
];

@NgModule({
  imports: [NativeScriptCommonModule, SalesHistoryRoutingModule],
  declarations: [SalesHistoryComponent],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [NativeScriptRouterModule],
})
export class SalesHistoryModule {}
