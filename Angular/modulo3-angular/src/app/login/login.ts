import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css']})

export class Login {
  constructor(private auth: AuthService, private router: Router) {}

  entrar() {
    this.auth.login();
    this.router.navigate(['/tareas']);}}