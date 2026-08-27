import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth/register',
        loadComponent: () =>
            import('./features/register/register')
            .then(route => route.Register)
    },
    {
        path: 'auth/login',
        loadComponent: () =>
            import('./features/login/login')
            .then(route => route.Login)
    },
    /*{
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/dashboard/dashboard')
            .then(route => route.Dashboard)
    }*/

];
