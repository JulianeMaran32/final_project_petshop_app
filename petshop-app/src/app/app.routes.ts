import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SuperAdminDashboardComponent } from './features/admin/super-admin-dashboard/super-admin-dashboard.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { roleGuard } from './core/guards/role.guard';
import { AboutComponent } from './features/info/about/about.component';
import { ContactComponent } from './features/info/contact/contact.component';
import { TermsOfServiceComponent } from './features/info/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './features/info/privacy-policy/privacy-policy.component';
import { authGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { ProductsComponent } from './features/products/products/products.component';
import { UserProfileComponent } from './features/users/user-profile/user-profile.component';
import { PetshopComponent } from './features/shop/petshop/petshop.component';
import { UserSettingsComponent } from './features/users/user-settings/user-settings.component';
import { PetshopCalendarComponent } from './features/calendar/petshop-calendar/petshop-calendar.component';
import { PetFormComponent } from './features/pets/pet-form/pet-form.component';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' 
    },
    { 
        path: 'home', 
        component: HomeComponent 
    },
    // FOOTER
    { 
        path: 'about', 
        component: AboutComponent 
    },
    { 
        path: 'contact', 
        component: ContactComponent 
    },
    { 
        path: 'terms-of-service', 
        component: TermsOfServiceComponent 
    },
    { 
        path: 'privacy-policy', 
        component: PrivacyPolicyComponent 
    },
    // NOT AUTHENTICATION
    { 
        path: 'register', 
        component: RegisterComponent 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: 'forgot-password', 
        component: ForgotPasswordComponent 
    },
    { 
        path: 'reset-password', 
        component: ResetPasswordComponent 
    },
    // ADMINS
    { 
        path: 'super-admin', 
        component: SuperAdminDashboardComponent, 
        canActivate: [authGuard, roleGuard], 
        data: { 
            roles: ['ROLE_SUPER_ADMIN'] 
        } 
    },
    { 
        path: 'admin', 
        component: AdminDashboardComponent, 
        canActivate: [authGuard, roleGuard], 
        data: { 
            roles: ['ROLE_ADMIN'] 
        } 
    },
    // PRODUCTS
    { 
        path: 'products', 
        component: ProductsComponent
    },
    { 
        path: 'petshop', 
        component: PetshopComponent
    },
    { 
        path: 'user-profile', 
        component: UserProfileComponent
    },
    // USERS
    { 
        path: 'settings', 
        component: UserSettingsComponent
        // canActivate: [authGuard]
    },
    // CALENDAR
    { 
        path: 'calendar', 
        component: PetshopCalendarComponent
    },
    { 
        path: 'pet-form', 
        component: PetFormComponent
    },
    // { 
    //     path: 'schedule/services', 
    //     component: PetshopCalendarComponent, 
    //     canActivate: [authGuard, roleGuard], 
    //     data: { 
    //         roles: [
    //             'ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 
    //             'ROLE_USER', 'ROLE_OWNER', 'ROLE_CUSTOMER', 
    //             'ROLE_EMPLOYEE', 'ROLE_VETERINARIAN'
    //         ]
    //     } 
    // },
    // NOT FOUND
    { 
        path: '**', 
        component: NotFoundComponent 
    }
];
