import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('~/app/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'browse',
    loadChildren: () => import('~/app/browse/browse.module').then((m) => m.BrowseModule),
  },
  {
    path: 'search',
    loadChildren: () => import('~/app/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'featured',
    loadChildren: () => import('~/app/featured/featured.module').then((m) => m.FeaturedModule),
  },
  {
    path: 'master',
    loadChildren: () => import('~/app/master/master.module').then((m) => m.MasterModule),
  },
  {
    path: "details/:id",
    loadChildren: () =>
      import("~/app/details/details.module").then((m) => m.DetailsModule),
  },
  {
    path: 'cart',              // NEW: Shopping cart route
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'sales-history',     // NEW: Sales history route
    loadChildren: () => import('./sales-history/sales-history.module').then(m => m.SalesHistoryModule)
  },
    {
    path: '',
    redirectTo: '/master',
    pathMatch: 'full'
  },
  {
    path: 'settings',
    loadChildren: () => import('~/app/settings/settings.module').then((m) => m.SettingsModule),
  },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
