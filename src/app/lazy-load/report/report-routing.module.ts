import { EquipmentsIssueReportComponent } from './equipments-issue-report/equipments-issue-report.component';
import { UsersIssueReportComponent } from './users-issue-report/users-issue-report.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserLikesReportComponent } from './user-likes-report/user-likes-report.component';
import { TotalIssueReportComponent } from './total-issue-report/total-issue-report.component';
import { OrganizationsIssueReportComponent } from './organizations-issue-report/organizations-issue-report.component';


const reportRoutes: Routes = [
  { path: '', component: UsersIssueReportComponent },
  { path: 'usersIssue', component: UsersIssueReportComponent },
  { path: 'equipmentsIssue', component: EquipmentsIssueReportComponent },
  { path: 'userLikes', component: UserLikesReportComponent },
  { path: 'totalIssues', component: TotalIssueReportComponent },
  { path: 'organizationsIssue', component: OrganizationsIssueReportComponent }
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
