import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptFormsModule } from "@nativescript/angular";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular'


@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptUISideDrawerModule,
    HttpClientModule],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
