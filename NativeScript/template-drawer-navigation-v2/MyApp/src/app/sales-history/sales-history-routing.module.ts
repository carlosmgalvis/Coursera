import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { SalesHistoryComponent } from './sales-history.component';

const routes: Routes = [
  { path: '', component: SalesHistoryComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SalesHistoryRoutingModule {}
