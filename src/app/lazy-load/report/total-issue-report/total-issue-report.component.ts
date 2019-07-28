import { IssueType } from './../../../dataModels/enums/issueType';
import { environment } from './../../../../environments/environment.prod';
import { AuthenticationService } from './../../../core/authentication.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportsService } from 'src/app/core/reports.service ';
import { TranslateService } from '@ngx-translate/core';
import { PersianDatePickerHelper } from 'src/app/core/persianDatePickerHelper';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/dataModels/viewModels/user';
import { PresidentType } from 'src/app/dataModels/enums/presidentType';
import { TotalIssueFormModel } from 'src/app/dataModels/apiModels/totalIssueFormModel';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { ReportStructureViewModel } from 'src/app/dataModels/viewModels/reportStructureViewModel';

@Component({
  selector: 'app-total-issue-report',
  templateUrl: './total-issue-report.component.html',
  styleUrls: ['./total-issue-report.component.css']
})
export class TotalIssueReportComponent implements OnInit, OnDestroy {

  loading = false;
  currentUser: User;
  presidentType = PresidentType;
  startDateTemplate: NgbDateStruct;
  endDateTemplate: NgbDateStruct;
  issueTypesSelect: any;
  totalIssueModel = new TotalIssueFormModel();

  constructor(
    private authenticationService: AuthenticationService,
    private reportsService: ReportsService,
    public translate: TranslateService,
    private persianDatePickerHelper: PersianDatePickerHelper,
    private toastr: ToastrService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
    this.issueTypesSelect = Object.keys(IssueType).filter(Number).map(key => ({ title: IssueType[key], value: key }));
  }

  ngOnDestroy() {
    this.reportsService.disposeDesignReport();
  }


  generateReport() {

    if (!this.totalIssueModel.issueType) {
      this.toastr.error(this.translate.instant('Report.SelectIssueType'));
      return;
    }

    this.totalIssueModel.endTime = this.persianDatePickerHelper.getDate(this.endDateTemplate, environment.language === 'fa');
    this.totalIssueModel.startTime = this.persianDatePickerHelper.getDate(this.startDateTemplate, environment.language === 'fa');

    this.loading = true;
    this.reportsService.totalIssueReport(this.totalIssueModel).subscribe((res: ServerResponseViewModel<any>) => {
      this.reportsService.getReportStructure('TotalIssue').subscribe((item: ServerResponseViewModel<ReportStructureViewModel>) => {
        this.reportsService.generateReport(item.data.configuration, res.data);
        this.loading = false;
      }, error => {
        this.loading = false;
      });
    }, error => {
      this.loading = false;
    });

  }


  designReport() {
    this.totalIssueModel.endTime = this.persianDatePickerHelper.getDate(this.endDateTemplate, environment.language === 'fa');
    this.totalIssueModel.startTime = this.persianDatePickerHelper.getDate(this.startDateTemplate, environment.language === 'fa');

    this.loading = true;
    this.reportsService.totalIssueReport(this.totalIssueModel).subscribe((res: ServerResponseViewModel<any>) => {
      this.reportsService.getReportStructure('TotalIssue').subscribe((item: ServerResponseViewModel<ReportStructureViewModel>) => {
        this.reportsService.loadDesignReport(item.data.configuration, res.data, 'TotalIssue');
      });
    });

  }

}
