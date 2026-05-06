import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import { routes } from './app.routes';
import { API_URL } from './tokens/api-token';
import { LoggerBase } from './clases/logger-base';
import { LoggerService } from './clases/logger.service';
import { LoggerAlias } from './clases/logger-alias';
import {provideHttpClient} from '@angular/common/http';
import {provideStore} from '@ngrx/store';
import {reducer} from './estado/reducer';

export const appConfig:
ApplicationConfig = {providers: [provideRouter(routes),
  {provide: API_URL, useValue: 'http://localhost:3000/api', multi: false},
  {provide: LoggerBase, useClass: LoggerService, multi: false, deps: []},
  {provide: LoggerAlias, useExisting: LoggerBase, multi: false, deps: []},
  provideHttpClient(),
  provideStore({reducer})]};