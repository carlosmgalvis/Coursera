/*import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import { MasterRoutingModule } from './master-routing.module'
import { MasterComponent } from './master.component'
*/
//import { Component, NO_ERRORS_SCHEMA, inject } from "@angular/core";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { MasterRoutingModule } from "./master-routing.module";
import { MasterComponent } from "./master.component";

@NgModule({
  imports: [NativeScriptCommonModule, MasterRoutingModule],
  declarations: [MasterComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MasterModule {}
/*
@Component({
  selector: "ns-master",
  templateUrl: "master.component.html",
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MasterModule {
  flickService = inject(FlickService);

}
*/
