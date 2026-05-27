import { Component, OnInit, inject } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { StorageService } from '~/core/services/storage.service';
import { alert, confirm, prompt } from '@nativescript/core';

@Component({
  selector: 'advanced-settings',
  templateUrl: './advanced-settings.component.html',
  styleUrls: ['./advanced-settings.component.scss']
})
export class AdvancedSettingsComponent implements OnInit {
  private router = inject(RouterExtensions);
  private storageService = inject(StorageService);

  apiConfig: any = {
    baseUrl: '',
    port: '',
    timeout: 30000,
    retryAttempts: 3
  };

  ngOnInit(): void {
    this.loadApiConfig();
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

  getFullApiUrl(): string {
    return `${this.apiConfig.baseUrl}:${this.apiConfig.port}/api`;
  }

  goBack(): void {
    this.router.back();
  }

async clearAllCache(): Promise<void> {
  const result = await confirm({
    title: 'Clear All Cache',
    message: 'This will clear all offline data including shows, cart, and sales. Continue?',
    okButtonText: 'Clear',
    cancelButtonText: 'Cancel'
  });

  if (result) {
    await this.storageService.clearAllOfflineData();
    this.storageService.clear();

    await alert({
      title: 'Success',
      message: 'All cache cleared. Restart the app to refresh data.',
      okButtonText: 'OK'
    });
  }
}

}
