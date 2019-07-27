import { UsersIssueReportComponent } from './users-issue-report/users-issue-report.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const reportRoutes: Routes = [
  { path: '', component: UsersIssueReportComponent },
  { path: 'usersIssue', component: UsersIssueReportComponent }
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
