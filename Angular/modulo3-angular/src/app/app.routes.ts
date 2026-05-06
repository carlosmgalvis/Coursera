import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Tareas } from './tareas/tareas';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'tareas', component: Tareas, canActivate: [authGuard]}];