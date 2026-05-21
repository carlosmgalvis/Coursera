import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { CartRoutingModule } from "./cart-routing.module";
import { CartComponent } from "./cart.component";

@NgModule({
  imports: [NativeScriptCommonModule, CartRoutingModule],
  declarations: [CartComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class CartModule {}
