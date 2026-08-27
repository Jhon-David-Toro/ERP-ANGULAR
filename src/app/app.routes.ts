import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/register',
    loadComponent: () => import('./features/register/register').then((route) => route.Register)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/login/login').then((route) => route.Login)
  }
];
