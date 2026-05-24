import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { AnalyticsRoutingModule } from './analytics-routing.module'
import { AnalyticsComponent } from './analytics.component'

@NgModule({
  imports: [NativeScriptCommonModule, AnalyticsRoutingModule],
  declarations: [AnalyticsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AnalyticsModule {}
