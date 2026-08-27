import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing-page/landing-page').then((route) => route.LandingPage)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/register/register').then((route) => route.Register)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/login/login').then((route) => route.Login)
  }
];
