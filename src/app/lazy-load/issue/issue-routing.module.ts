import { IssueSearchComponent } from './issue-search/issue-search.component';
import { IssueAddComponent } from './issue-add/issue-add.component';
import { IssueComponent } from './issue.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const issueRoutes: Routes = [
  { path: '', component: IssueComponent },
  { path: 'add', component: IssueAddComponent },
  { path: 'search', component: IssueSearchComponent },
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
