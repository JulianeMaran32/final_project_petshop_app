import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  debug(message: string, data?: any) {
    console.debug(`[DEBUG]: ${message}`, data);
  }

  info(message: string, data?: any) {
    console.info(`[INFO]: ${message}`, data);
  }

  warn(message: string, data?: any) {
    console.warn(`[WARN]: ${message}`, data);
  }

  error(message: string, error?: any) {
    console.error(`[ERROR]: ${message}`, error);
  }
  
}
