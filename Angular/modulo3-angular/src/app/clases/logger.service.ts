import { Injectable } from '@angular/core';
import { LoggerBase } from './logger-base';

@Injectable()
export class LoggerService
extends LoggerBase {log (mensaje: string) {console.log ('LOG:',mensaje);}}