import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth.guard';
import { Layout } from './layout/layout';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'activos' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login-page/login-page').then(m => m.LoginPage),
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      {
        path: 'activos',
        loadComponent: () => import('./features/activos/asignacion-page').then(m => m.AsignacionPage),
      },
    ],
  },
  { path: '**', redirectTo: 'activos' },
];
