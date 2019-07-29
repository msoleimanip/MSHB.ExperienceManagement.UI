import { IssueOfOrganizationFormModel } from './../../../dataModels/apiModels/issueOfOrganizationFormModel';
import { OrganizationService } from 'src/app/core/organization.service';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/dataModels/viewModels/user';
import { PresidentType } from 'src/app/dataModels/enums/presidentType';
import { ReportService } from 'src/app/core/report.service';
import { TranslateService } from '@ngx-translate/core';
import { PersianDatePickerHelper } from 'src/app/core/persianDatePickerHelper';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { ReportStructureViewModel } from 'src/app/dataModels/viewModels/reportStructureViewModel';

@Component({
  selector: 'app-organizations-issue-report',
  templateUrl: './organizations-issue-report.component.html',
  styleUrls: ['./organizations-issue-report.component.css']
})
export class OrganizationsIssueReportComponent implements OnInit, OnDestroy {

  loading = false;
  currentUser: User;
  presidentType = PresidentType;

  files: any[];

  startDateTemplate: NgbDateStruct;
  endDateTemplate: NgbDateStruct;

  issueOfOrganizationModel = new IssueOfOrganizationFormModel();

  constructor(
    private authenticationService: AuthenticationService,
    private reportService: ReportService,
    public translate: TranslateService,
    private orgService: OrganizationService,
    private persianDatePickerHelper: PersianDatePickerHelper,
    private toastr: ToastrService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
    this.loadTree();
  }

  ngOnDestroy() {
    this.reportService.disposeDesignReport();
  }


  loadTree() {
    this.orgService.getTree().subscribe(res => {
      this.files = res.data;
    });
  }

  treeClick(param: any) {
    if (param) {
      this.issueOfOrganizationModel.orgIds = param;
    }
  }

  generateReport() {
    this.issueOfOrganizationModel.endTime = this.persianDatePickerHelper.getDate(this.endDateTemplate, environment.language === 'fa');
    this.issueOfOrganizationModel.startTime = this.persianDatePickerHelper.getDate(this.startDateTemplate, environment.language === 'fa');

    if (this.issueOfOrganizationModel.orgIds.length === 0) {
      this.toastr.error(this.translate.instant('Report.IdsCountIsZero'));
      return;
    }

    this.loading = true;
    this.reportService.issuesOfOrganizationReport(this.issueOfOrganizationModel).subscribe((res: ServerResponseViewModel<any>) => {
      this.reportService.getReportStructure('IssuesOfOrganization')
        .subscribe((item: ServerResponseViewModel<ReportStructureViewModel>) => {
          this.reportService.generateReport(item.data.configuration, res.data);
          this.loading = false;
        }, error => {
          this.loading = false;
        });
    }, error => {
      this.loading = false;
    });

  }


  designReport() {
    this.issueOfOrganizationModel.endTime = this.persianDatePickerHelper.getDate(this.endDateTemplate, environment.language === 'fa');
    this.issueOfOrganizationModel.startTime = this.persianDatePickerHelper.getDate(this.startDateTemplate, environment.language === 'fa');

    if (this.issueOfOrganizationModel.orgIds.length === 0) {
      this.toastr.error(this.translate.instant('Report.IdsCountIsZero'));
      return;
    }

    this.loading = true;
    this.reportService.issuesOfOrganizationReport(this.issueOfOrganizationModel).subscribe((res: ServerResponseViewModel<any>) => {
      this.reportService.getReportStructure('IssuesOfOrganization')
        .subscribe((item: ServerResponseViewModel<ReportStructureViewModel>) => {
          this.reportService.loadDesignReport(item.data.configuration, res.data, 'IssuesOfOrganization');
        });
    });

  }

}
