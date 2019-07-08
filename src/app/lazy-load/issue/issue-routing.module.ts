import { IssueComponent } from './issue.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const issueRoutes: Routes = [
  { path: '', component: IssueComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(issueRoutes)
  ],
  exports: [
    RouterModule
  ],
})

export class IssueRoutingModule {

}
