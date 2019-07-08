import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from '../report/report.component';
import { ReportRoutingModule } from './report-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReportRedesignComponent } from './report-redesign/report-redesign.component';

@NgModule({
  declarations: [ReportComponent, ReportRedesignComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgbModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  entryComponents: [ReportRedesignComponent]
})
export class ReportModule { }
