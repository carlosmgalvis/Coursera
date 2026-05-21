import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as application from '@nativescript/core';
import * as applicationSettings from '@nativescript/core/application-settings';

@Component({
  selector: 'Map',
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  @ViewChild('mapView', { static: false }) mapView: ElementRef;

  private readonly GOOGLE_MAPS_API_KEY = 'google_maps_api_key';
  latitude: number = -33.8688;
  longitude: number = 151.2195;
  zoom: number = 12;
  apiKey: string = '';

  constructor() {}

  ngOnInit(): void {
    this.loadApiKey();
  }

  loadApiKey(): void {
    this.apiKey = applicationSettings.getString(this.GOOGLE_MAPS_API_KEY, 'TU_API_KEY_DE_GOOGLE_MAPS');
  }

  setApiKey(key: string): void {
    applicationSettings.setString(this.GOOGLE_MAPS_API_KEY, key);
    this.apiKey = key;
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>application.getRootView();
    sideDrawer.showDrawer();
  }

  onMapReady(event: any): void {
    console.log('Google Maps listo con API Key: ' + this.apiKey);
    console.log('Latitud: ' + this.latitude + ', Longitud: ' + this.longitude);
    console.log('Marker configurado en Sydney, Australia');
  }
}