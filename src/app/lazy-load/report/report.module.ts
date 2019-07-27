import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersIssueReportComponent } from './users-issue-report/users-issue-report.component';

@NgModule({
  declarations: [UsersIssueReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgbModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: []
})
export class ReportModule { }
