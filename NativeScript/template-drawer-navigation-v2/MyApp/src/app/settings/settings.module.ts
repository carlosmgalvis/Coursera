import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { NativeScriptFormsModule } from "@nativescript/angular";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { GeneralInfoComponent } from "./general-info/general-info.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AdvancedSettingsComponent } from "./advanced-settings/advanced-settings.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent,
    GeneralInfoComponent,
    UserProfileComponent,
    AdvancedSettingsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SettingsModule {}
