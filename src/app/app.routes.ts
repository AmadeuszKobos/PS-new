import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { authGuard } from './core/auth/auth.guard';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Domyślne przekierowanie
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'add', loadComponent: () => import('./features/add/pages/add.component').then(m => m.AddComponent) },
      { path: 'warehouse', loadComponent: () => import('./features/warehouse/pages/warehouse/warehouse.component').then(m => m.WarehouseComponent) },
      { path: 'records', loadComponent: () => import('./features/records/pages/records/records.component').then(m => m.RecordsComponent) },
      { path: 'settings', loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent) },
      { path: 'item-history', loadComponent: () => import('./features/warehouse/pages/item-history/item-history.component').then(m => m.ItemHistoryComponent)},
      { path: 'client-history', loadComponent: () => import('./features/records/pages/client-history/client-history.component').then(m => m.ClientHistoryComponent)}
    ]
  },
  { path: '**', redirectTo: '/login' } // Catch-all przekierowanie
];