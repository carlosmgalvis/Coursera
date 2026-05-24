import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { AnalyticsComponent } from './analytics.component'

const routes: Routes = [{ path: '', component: AnalyticsComponent }]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class AnalyticsRoutingModule {}
