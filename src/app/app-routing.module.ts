import { HomeComponent } from './home/home.component';
import { PresidentType } from './dataModels/enums/presidentType';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './_gaurds/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    loadChildren: './lazy-load/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
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
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
