import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { SearchComponent } from './search.component'

const routes: Routes = [
  { path: '', component: SearchComponent },
  { 
    path: 'detail', 
    loadChildren: () => import('~/app/search-detail/search-detail.module').then(m => m.SearchDetailModule)
  }
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SearchRoutingModule {}
