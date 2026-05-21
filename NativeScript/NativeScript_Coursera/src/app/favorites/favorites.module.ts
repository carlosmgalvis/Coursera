import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { NativeScriptFormsModule } from '@nativescript/angular';
import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    FavoritesRoutingModule
  ],
  declarations: [
    FavoritesComponent
  ],
  exports: [
    FavoritesComponent
  ]
})
export class FavoritesModule { }