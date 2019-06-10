import { AccessDeniedComponent } from './shared/access-denied/access-denied.component';
import { NotFoundComponent } from './shared/notFound/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OrganizationModule } from './lazy-load/organization/organization.module';
import { DashboardModule } from './lazy-load/dashboard/dashboard.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_gaurds/auth.guard';

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
