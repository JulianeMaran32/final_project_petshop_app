import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/role.guard';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { UserFormComponent } from './features/user-form/user-form.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PetListComponent } from './features/pets/pet-list/pet-list.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UserProfileComponent } from './features/users/user-profile/user-profile.component';
import { CalendarComponent } from './features/calendar/calendar/calendar.component';
import { AppointmentFormComponent } from './features/appointments/appointment-form/appointment-form.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: UserFormComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: {
            roles: ['SUPER_ADMIN', 'ADMIN']
        }
    },
    {
        path: 'pet-list',
        component: PetListComponent,
        canActivate: [authGuard]
    },
    {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [authGuard],
    },
    {
        path: 'appointments',
        component: AppointmentFormComponent,
        canActivate: [authGuard],
    },
    {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [authGuard],
    },
    // NOT FOUND
    {
        path: '**',
        component: NotFoundComponent
    }
];
