import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { NativeScriptFormsModule } from "@nativescript/angular";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule {}
