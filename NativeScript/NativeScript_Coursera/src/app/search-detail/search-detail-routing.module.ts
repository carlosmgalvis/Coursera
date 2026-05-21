import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'
import { SearchDetailComponent } from './search-detail.component'

const routes: Routes = [
  { path: '', component: SearchDetailComponent }
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class SearchDetailRoutingModule {}
