import { Injectable } from '@angular/core';
import { Connectivity } from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private connectionType: number;

  constructor() {
    this.connectionType = Connectivity.getConnectionType();
    Connectivity.startMonitoring((newConnectionType: number) => {
      this.connectionType = newConnectionType;
      console.log('Network connection type changed:', newConnectionType);
    });
  }

  isConnected(): boolean {
    return this.connectionType !== Connectivity.connectionType.none;
  }

  getConnectionType(): number {
    return this.connectionType;
  }

  isWifi(): boolean {
    return this.connectionType === Connectivity.connectionType.wifi;
  }
}
