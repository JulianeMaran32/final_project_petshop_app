import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withXsrfConfiguration } from '@angular/common/http';
import { AdminModule } from './features/admin/admin.module';
import { AuthModule } from './features/auth/auth.module';
import { HomeModule } from './features/home/home.module';
import { PetsModule } from './features/pets/pets.module';
import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { LayoutsModule } from './layouts/layouts.module';
import { InfoModule } from './features/info/info.module';
import { LoggerService } from './core/services/logger.service';
import { TranslateService } from '@ngx-translate/core';
import { ContactService } from './core/services/contact.service';
import { PasswordService } from './core/services/password.service';
import { ServiceScheduleService } from './core/services/service-schedule.service';
import { VetScheduleService } from './core/services/vet-schedule.service';
import { UsersModule } from './features/users/users.module';
import { AddressModule } from './features/address/address.module';
import { ProductsModule } from './features/products/products.module';
import { ServicesModule } from './features/services/services.module';
import { ShopModule } from './features/shop/shop.module';
import { AddressService } from './core/services/address.service';
import { DeliveryService } from './core/services/delivery.service';
import { ProductsService } from './core/services/products.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { UploadService } from './core/services/upload.service';
import { CalendarModule } from './features/calendar/calendar.module';

const locale = 'pt-BR';

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
      })
    ),
    provideAnimationsAsync(),
    importProvidersFrom(
      AddressModule,
      AdminModule,
      AuthModule,
      CalendarModule,
      HomeModule,
      InfoModule,
      PetsModule,
      ProductsModule,
      ServicesModule,
      ShopModule,
      UsersModule,
      LayoutsModule,
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
    {
      provide: LOCALE_ID,
      useValue: locale
    },
    {
      provide: HTTP_INTERCEPTORS,
      useValue: authInterceptor,
      multi: true
    },
    {
      provide: LoggerService,
      useClass: LoggerService
    }, 
    // Firebase
    provideFirebaseApp(
      () => initializeApp({
        "projectId":"petshop-29a1d", // "PROJECT_ID" from Firebase Console
        "appId":"1:881404243409:web:07ea869a546381c62144f0", // "APP_ID" from Firebase Console
        "storageBucket":"petshop-29a1d.appspot.com", // "STORAGE_BUCKET" from Firebase Console
        "apiKey":"AIzaSyDQtlFo910Ua3TCvSzDhprwfjdN6CLzqZQ", // "API_KEY" from Firebase Console
        "authDomain":"petshop-29a1d.firebaseapp.com", // "AUTH_DOMAIN" from Firebase Console
        "messagingSenderId":"881404243409", // "MESSAGE_SENDER_ID" from Firebase Console
        "measurementId":"G-4FDLD8J94T" // "MEASUREMENT_ID" from Firebase Console
      })
    ), 
    provideStorage(
      () => getStorage()
    )
  ]
};
