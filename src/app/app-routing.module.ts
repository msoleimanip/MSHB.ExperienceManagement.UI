import { PresidentType } from './dataModels/enums/presidentType';
import { IssueModule } from './lazy-load/issue/issue.module';
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
    loadChildren: './lazy-load/organization/organization.module#OrganizationModule',
    canActivate: [AuthGuard],
    data: { roles: [PresidentType.Admin] }
  },
  {
    path: 'equipment',
    loadChildren: './lazy-load/equipment/equipment.module#EquipmentModule',
    canActivate: [AuthGuard],
    data: { roles: [PresidentType.Admin] }
  },
  {
    path: 'users',
    loadChildren: './lazy-load/users/users.module#UsersModule',
    canActivate: [AuthGuard],
    data: { roles: [PresidentType.Admin] }
  },
  {
    path: 'issue',
    loadChildren: './lazy-load/issue/issue.module#IssueModule',
    canActivate: [AuthGuard],
    data: { roles: [] }
  },
  {
    path: 'authentication',
    loadChildren: './lazy-load/authentication/authentication.module#AuthenticationModule',
    canActivate: [AuthGuard],
    data: { roles: [PresidentType.Admin] }
  },
  {
    path: 'shared',
    loadChildren: './shared/shared.module#SharedModule',
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
