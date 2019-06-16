import { EquipmentModule } from './lazy-load/equipment/equipment.module';
import { AccessDeniedComponent } from './shared/access-denied/access-denied.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OrganizationModule } from './lazy-load/organization/organization.module';
import { DashboardModule } from './lazy-load/dashboard/dashboard.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_gaurds/auth.guard';
import { UsersModule } from './lazy-load/users/users.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => DashboardModule
  },
  {
    path: 'organization',
    loadChildren: () => OrganizationModule,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'equipment',
    loadChildren: () => EquipmentModule,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'users',
    loadChildren: () => UsersModule,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'accessDenied',
    component: AccessDeniedComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
