import { ReportComponent } from './report.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const reportRoutes: Routes = [
  { path: '', component: ReportComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(reportRoutes)
  ],
  exports: [
    RouterModule
  ],
})

export class ReportRoutingModule {

}
