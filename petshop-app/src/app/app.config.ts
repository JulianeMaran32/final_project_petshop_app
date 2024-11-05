import { ApplicationConfig, importProvidersFrom, Injector, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withXsrfConfiguration, HttpClient, withInterceptors, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { routes } from './app.routes';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { LayoutsModule } from './layouts/layouts.module';
import { LoggerService } from './core/services/logger.service';
import { ContactService } from './core/services/contact.service';
import { PasswordService } from './core/services/password.service';
import { ServiceScheduleService } from './core/services/service-schedule.service';
import { VetScheduleService } from './core/services/vet-schedule.service';
import { AddressService } from './core/services/address.service';
import { DeliveryService } from './core/services/delivery.service';
import { ProductsService } from './core/services/products.service';
import { UploadService } from './core/services/upload.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import localePt from '@angular/common/locales/pt';
import { PetsModule } from './features/pets/pets.module';
import { UsersModule } from './features/users/users.module';
import { CalendarModule } from './features/calendar/calendar.module';
import { authInterceptor } from './core/interceptors/auth.interceptor';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      }),
      withInterceptorsFromDi()
    ),
    provideAnimationsAsync(),
    importProvidersFrom(
      LayoutsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    AddressService,
    AuthService,
    ContactService,
    DeliveryService,
    PasswordService,
    ProductsService,
    ServiceScheduleService,
    UploadService,
    UserService,
    VetScheduleService,
    // PrimeNG
    CookieService,
    MessageService,
    TranslateService,
    ConfirmationService,
    PetsModule,
    UsersModule,
    CalendarModule,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',  // Formato de exibição de data
          monthYearLabel: 'MMM YYYY',  // Formato do rótulo de mês e ano
          dateA11yLabel: 'DD/MM/YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    },
    {
      provide: LoggerService,
      useClass: LoggerService
    },
    provideAnimationsAsync(),
  ]
};
