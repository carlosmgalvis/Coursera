import { Routes } from '@angular/router';
import { Padre } from './componentes/padre/padre';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  {
    path: 'inicio',
    component: Padre
  }

];