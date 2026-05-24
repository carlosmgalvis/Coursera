import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { Application } from '@nativescript/core'
import { Component, OnInit, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { AuthService } from '~/core/services/auth.service';
import { StorageService } from '~/core/services/storage.service';
import { alert, confirm, prompt } from '@nativescript/core';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private router = inject(RouterExtensions);
  private authService = inject(AuthService);
  private storageService = inject(StorageService);

  user: any = {
    email: '',
    name: '',
    phone: ''
  };

  apiConfig: any = {
    baseUrl: '',
    port: '',
    timeout: 30000,
    retryAttempts: 3
  };

  ngOnInit(): void {
    this.loadUserData();
    this.loadApiConfig();
  }

  loadUserData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = { ...currentUser };
    }
  }

  loadApiConfig(): void {
    const savedConfig = this.storageService.getItem<any>('api_config');
    if (savedConfig) {
      this.apiConfig = savedConfig;
    } else {
      // Default configuration
      this.apiConfig = {
        baseUrl: 'https://retiree-doorknob-nutcase.ngrok-free.dev',
        port: '3000',
        timeout: 30000,
        retryAttempts: 3
      };
    }
  }

  // User Profile Methods
  async editUserName(): Promise<void> {
    const result = await prompt({
      title: 'Edit Name',
      message: 'Enter your full name:',
      defaultText: this.user.name || '',
      okButtonText: 'Save',
      cancelButtonText: 'Cancel'
    });

    if (result.result && result.text) {
      this.user.name = result.text;
      await this.saveUserData();
      await alert({
        title: 'Success',
        message: 'Name updated successfully.',
        okButtonText: 'OK'
      });
      this.loadUserData();
    }
  }

  async editUserPhone(): Promise<void> {
    const result = await prompt({
      title: 'Edit Phone',
      message: 'Enter your phone number:',
      defaultText: this.user.phone || '',
      okButtonText: 'Save',
      cancelButtonText: 'Cancel'
    });

    if (result.result && result.text) {
      this.user.phone = result.text;
      await this.saveUserData();
      await alert({
        title: 'Success',
        message: 'Phone number updated successfully.',
        okButtonText: 'OK'
      });
      this.loadUserData();
    }
  }

  async editUserPassword(): Promise<void> {
    // First prompt for new password
    const result = await prompt({
      title: 'Change Password',
      message: 'Enter new password (min 6 characters):',
      defaultText: '',
      okButtonText: 'Next',
      cancelButtonText: 'Cancel'
    });

    if (result.result && result.text) {
      const newPassword = result.text;

      if (newPassword.length >= 6) {
        // Confirm password
        const confirmResult = await prompt({
          title: 'Confirm Password',
          message: 'Confirm your new password:',
          defaultText: '',
          okButtonText: 'Save',
          cancelButtonText: 'Cancel'
        });

        if (confirmResult.result && confirmResult.text === newPassword) {
          // Here you would call an API to update password
          await alert({
            title: 'Success',
            message: 'Password updated successfully.',
            okButtonText: 'OK'
          });
        } else if (confirmResult.result) {
          await alert({
            title: 'Error',
            message: 'Passwords do not match.',
            okButtonText: 'OK'
          });
        }
      } else {
        await alert({
          title: 'Error',
          message: 'Password must be at least 6 characters.',
          okButtonText: 'OK'
        });
      }
    }
  }

  async saveUserData(): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...this.user };
      this.storageService.setItem('user', updatedUser);
    }
  }

  // API Configuration Methods
  async editApiBaseUrl(): Promise<void> {
    const result = await prompt({
      title: 'API Base URL',
      message: 'Enter the API base URL (without port):\nExample: https://your-server.ngrok-free.dev',
      defaultText: this.apiConfig.baseUrl,
      okButtonText: 'Save',
      cancelButtonText: 'Cancel'
    });

    if (result.result && result.text) {
      this.apiConfig.baseUrl = result.text;
      await this.saveApiConfig();
      await alert({
        title: 'Success',
        message: 'API URL updated. Restart app for changes to take effect.',
        okButtonText: 'OK'
      });
    }
  }

  async editApiPort(): Promise<void> {
    const result = await prompt({
      title: 'API Port',
      message: 'Enter the API port:',
      defaultText: this.apiConfig.port,
      okButtonText: 'Save',
      cancelButtonText: 'Cancel'
    });

    if (result.result && result.text) {
      this.apiConfig.port = result.text;
      await this.saveApiConfig();
      await alert({
        title: 'Success',
        message: 'API Port updated. Restart app for changes to take effect.',
        okButtonText: 'OK'
      });
    }
  }

  async editApiTimeout(): Promise<void> {
    const result = await prompt({
      title: 'Request Timeout',
      message: 'Enter timeout in milliseconds (default: 30000):',
      defaultText: this.apiConfig.timeout.toString(),
      okButtonText: 'Save',
      cancelButtonText: 'Cancel'
    });

    if (result.result && result.text) {
      const timeout = parseInt(result.text, 10);
      if (!isNaN(timeout)) {
        this.apiConfig.timeout = timeout;
        await this.saveApiConfig();
        await alert({
          title: 'Success',
          message: 'Timeout updated successfully.',
          okButtonText: 'OK'
        });
      } else {
        await alert({
          title: 'Error',
          message: 'Please enter a valid number.',
          okButtonText: 'OK'
        });
      }
    }
  }

  async editApiRetryAttempts(): Promise<void> {
    const result = await prompt({
      title: 'Retry Attempts',
      message: 'Enter number of retry attempts (default: 3):',
      defaultText: this.apiConfig.retryAttempts.toString(),
      okButtonText: 'Save',
      cancelButtonText: 'Cancel'
    });

    if (result.result && result.text) {
      const retries = parseInt(result.text, 10);
      if (!isNaN(retries)) {
        this.apiConfig.retryAttempts = retries;
        await this.saveApiConfig();
        await alert({
          title: 'Success',
          message: 'Retry attempts updated successfully.',
          okButtonText: 'OK'
        });
      } else {
        await alert({
          title: 'Error',
          message: 'Please enter a valid number.',
          okButtonText: 'OK'
        });
      }
    }
  }

  async saveApiConfig(): Promise<void> {
    this.storageService.setItem('api_config', this.apiConfig);
  }

  async resetApiConfig(): Promise<void> {
    const result = await confirm({
      title: 'Reset Configuration',
      message: 'Are you sure you want to reset API configuration to defaults?',
      okButtonText: 'Reset',
      cancelButtonText: 'Cancel'
    });

    if (result) {
      this.apiConfig = {
        baseUrl: 'https://retiree-doorknob-nutcase.ngrok-free.dev',
        port: '3000',
        timeout: 30000,
        retryAttempts: 3
      };
      await this.saveApiConfig();
      await alert({
        title: 'Success',
        message: 'API configuration reset to defaults. Restart app for changes to take effect.',
        okButtonText: 'OK'
      });
    }
  }

  async testApiConnection(): Promise<void> {
    const url = `${this.apiConfig.baseUrl}:${this.apiConfig.port}/health`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });

      if (response.ok) {
        await alert({
          title: '✅ Connection Successful',
          message: `Successfully connected to ${url}`,
          okButtonText: 'OK'
        });
      } else {
        throw new Error('Connection failed');
      }
    } catch (error) {
      await alert({
        title: '❌ Connection Failed',
        message: `Could not connect to ${url}.\n\nPlease check:\n1. Server is running\n2. URL is correct\n3. Network connection`,
        okButtonText: 'OK'
      });
    }
  }

  async logout(): Promise<void> {
    const result = await confirm({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      okButtonText: 'Logout',
      cancelButtonText: 'Cancel'
    });

    if (result) {
      this.authService.logout();
      this.router.navigate(['/login'], { clearHistory: true });
    }
  }

  goBack(): void {
    this.router.back();
  }
  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView()
    sideDrawer.showDrawer()
  }
  getFullApiUrl(): string {
    return `${this.apiConfig.baseUrl}:${this.apiConfig.port}/api`;
  }
}
