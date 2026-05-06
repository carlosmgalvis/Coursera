import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { trackingReducer } from './store/tracking.reducer';

export const appConfig: ApplicationConfig = {

  providers: [

    provideStore({
      tracking: trackingReducer
    })

  ]

};