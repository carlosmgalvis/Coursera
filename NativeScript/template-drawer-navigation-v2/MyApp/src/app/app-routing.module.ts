import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

const routes: Routes = [
  { path: '', redirectTo: '/master', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('~/app/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('~/app/analytics/analytics.module').then((m) => m.AnalyticsModule),
  },
  {
    path: 'search',
    loadChildren: () => import('~/app/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'favorites',
    loadChildren: () => import('~/app/favorites/favorites.module').then((m) => m.FavoritesdModule),
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
    path: 'purchase-history',
    loadChildren: () => import('./purchase-history/purchase-history.module').then(m => m.PurchaseHistoryModule)
  },
    {
    path: '',
    redirectTo: '/login',
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
