import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { PurchaseHistoryRoutingModule } from "./purchase-history-routing.module";
import { PurchaseHistoryComponent } from "./purchase-history.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    PurchaseHistoryRoutingModule
  ],
  declarations: [PurchaseHistoryComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PurchaseHistoryModule {}
