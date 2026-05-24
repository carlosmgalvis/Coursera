import { Component, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '~/core/services/auth.service';
import { alert } from '@nativescript/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(RouterExtensions);

  email: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';
  isRegistering: boolean = false;

  async onLogin(): Promise<void> {
    if (!this.email || !this.password) {
      await alert({
        title: 'Error',
        message: 'Please enter email and password',
        okButtonText: 'OK'
      });
      return;
    }

    const user = await this.authService.login({
      email: this.email,
      password: this.password
    });

    if (user) {
      this.router.navigate(['/master'], { clearHistory: true });
    } else {
      await alert({
        title: 'Login Failed',
        message: 'Invalid email or password',
        okButtonText: 'OK'
      });
    }
  }

  async onRegister(): Promise<void> {
    if (!this.email || !this.password || !this.name) {
      await alert({
        title: 'Error',
        message: 'Please fill all fields',
        okButtonText: 'OK'
      });
      return;
    }

    const user = await this.authService.register({
      email: this.email,
      password: this.password,
      name: this.name,
      phone: this.phone
    });

    if (user) {
      this.router.navigate(['/master'], { clearHistory: true });
    } else {
      await alert({
        title: 'Registration Failed',
        message: 'Unable to create account. Email may already exist.',
        okButtonText: 'OK'
      });
    }
  }

  toggleMode(): void {
    this.isRegistering = !this.isRegistering;
    // Clear fields when switching modes
    this.password = '';
    if (!this.isRegistering) {
      this.name = '';
      this.phone = '';
    }
  }
}
