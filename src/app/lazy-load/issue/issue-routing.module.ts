import { IssueSearchComponent } from './issue-search/issue-search.component';
import { IssueAddComponent } from './issue-add/issue-add.component';
import { IssueComponent } from './issue.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { IssueDisplayComponent } from './issue-display/issue-display.component';


const issueRoutes: Routes = [
  { path: '', component: IssueComponent },
  { path: 'add', component: IssueAddComponent },
  { path: 'search', component: IssueSearchComponent },
  { path: 'search/:content', component: IssueSearchComponent },
  { path: 'display/:id', component: IssueDisplayComponent }
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
