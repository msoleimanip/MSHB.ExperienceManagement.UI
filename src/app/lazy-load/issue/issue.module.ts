import { IssueRoutingModule } from './issue-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { IssueComponent } from './issue.component';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [IssueComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    NgbModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class IssueModule { }
