import { NotFoundComponent } from './shared/notFound/not-found.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OrganizationModule } from './lazy-load/organization/organization.module';
import { DashboardModule } from './lazy-load/dashboard/dashboard.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'organization', loadChildren: () => OrganizationModule },
  { path: '', loadChildren: () => DashboardModule },
  { path: 'notFound', component: NotFoundComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/notFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
