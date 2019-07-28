import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationService } from './../../../core/organization.service';
import { PresidentType } from './../../../dataModels/enums/presidentType';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { IssueOfUsersFormModel } from './../../../dataModels/apiModels/issueOfUsersFormModel';
import { environment } from 'src/environments/environment.prod';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ReportsService } from 'src/app/core/reports.service ';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { User } from 'src/app/dataModels/viewModels/user';
import { UsersService } from 'src/app/core/users.service';
import { UserOrgViewModel } from 'src/app/dataModels/apiModels/userOrgViewModel';
import { ReportStructureViewModel } from 'src/app/dataModels/viewModels/reportStructureViewModel';
import { PersianDatePickerHelper } from 'src/app/core/persianDatePickerHelper';

@Component({
  selector: 'app-users-issue-report',
  templateUrl: './users-issue-report.component.html',
  styleUrls: ['./users-issue-report.component.css']
})
export class UsersIssueReportComponent implements OnInit, OnDestroy {

  loading = false;
  currentUser: User;
  presidentType = PresidentType;

  files: any[];
  selectedIds = [];

  startDateTemplate: NgbDateStruct;
  endDateTemplate: NgbDateStruct;

  users = [];
  usersSelected = new Array<UserOrgViewModel>();
  dropdownSettings = {
    singleSelection: false, idField: 'id', textField: 'username',
    selectAllText: this.translate.instant('General.SelectAllText'),
    unSelectAllText: this.translate.instant('General.UnSelectAllText'), itemsShowLimit: 3, allowSearchFilter: true
  };

  constructor(
    private authenticationService: AuthenticationService,
    private reportsService: ReportsService,
    public translate: TranslateService,
    private orgService: OrganizationService,
    private userService: UsersService,
    private persianDatePickerHelper: PersianDatePickerHelper,
    private toastr: ToastrService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
    this.loadTree();
    this.loadUsers([]);
  }

  ngOnDestroy() {
    this.reportsService.disposeDesignReport();
  }


  loadTree() {
    this.orgService.getTree().subscribe(res => {
      this.files = res.data;
    });
  }

  treeClick(param: any) {
    if (param) {
      this.selectedIds = param;
      this.loadUsers(param);
    }
  }

  loadUsers(orgIds: Array<number>) {
    this.userService.getOrganizationUsers(orgIds).subscribe((res: ServerResponseViewModel<Array<UserOrgViewModel>>) => {
      this.users = res.data;
    });
  }

  generateReport() {
    const issueOfUsersModel = new IssueOfUsersFormModel();
    issueOfUsersModel.users = this.usersSelected.map(x => x.id);

    issueOfUsersModel.endTime = this.persianDatePickerHelper.getDate(this.endDateTemplate, environment.language === 'fa');
    issueOfUsersModel.startTime = this.persianDatePickerHelper.getDate(this.startDateTemplate, environment.language === 'fa');

    if (issueOfUsersModel.users.length === 0) {
      this.toastr.error(this.translate.instant('Report.UsersCountIsZero'));
      return;
    }

    this.loading = true;
    this.reportsService.issueOfUsersReport(issueOfUsersModel).subscribe((res: ServerResponseViewModel<any>) => {
      this.reportsService.getReportStructure('IssueOfUsers').subscribe((item: ServerResponseViewModel<ReportStructureViewModel>) => {
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
    const issueOfUsersModel = new IssueOfUsersFormModel();
    issueOfUsersModel.users = this.usersSelected.map(x => x.id);

    issueOfUsersModel.endTime = this.persianDatePickerHelper.getDate(this.endDateTemplate, environment.language === 'fa');
    issueOfUsersModel.startTime = this.persianDatePickerHelper.getDate(this.startDateTemplate, environment.language === 'fa');

    if (issueOfUsersModel.users.length === 0) {
      this.toastr.error(this.translate.instant('Report.UsersCountIsZero'));
      return;
    }

    this.loading = true;
    this.reportsService.issueOfUsersReport(issueOfUsersModel).subscribe((res: ServerResponseViewModel<any>) => {
      this.reportsService.getReportStructure('IssueOfUsers').subscribe((item: ServerResponseViewModel<ReportStructureViewModel>) => {
        this.reportsService.loadDesignReport(item.data.configuration, res.data, 'IssueOfUsers');
      });
    });

  }


}
