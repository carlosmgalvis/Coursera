import { Injectable }from '@angular/core';

@Injectable({providedIn: 'root'})

export class AuthService {logueado = false;
  login() {this.logueado = true;}
  logout() {this.logueado = false;}
  estaLogueado() {return this.logueado;}}