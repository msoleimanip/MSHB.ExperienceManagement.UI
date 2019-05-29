import { DashboardComponent } from '../dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ],
})

export class DashboardRoutingModule {

}
