import { IssueOfUsersFormModel } from './../../../dataModels/apiModels/issueOfUsersFormModel';
import { OrganizationService } from 'src/app/core/organization.service';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PresidentType } from './../../../dataModels/enums/presidentType';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/dataModels/viewModels/user';
import { ReportService } from 'src/app/core/report.service';
import { TranslateService } from '@ngx-translate/core';
import { PersianDatePickerHelper } from 'src/app/core/persianDatePickerHelper';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { UserOrgViewModel } from 'src/app/dataModels/apiModels/userOrgViewModel';
import { UsersService } from 'src/app/core/users.service';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { ReportStructureViewModel } from 'src/app/dataModels/viewModels/reportStructureViewModel';

@Component({
  selector: 'app-user-likes-report',
  templateUrl: './user-likes-report.component.html',
  styleUrls: ['./user-likes-report.component.css']
})
export class UserLikesReportComponent implements OnInit, OnDestroy {

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
    private reportService: ReportService,
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
    this.reportService.disposeDesignReport();
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
    this.reportService.issueOfUserLikesReport(issueOfUsersModel).subscribe((res: ServerResponseViewModel<any>) => {
      this.reportService.getReportStructure('IssueOfUserLikes').subscribe((item: ServerResponseViewModel<ReportStructureViewModel>) => {
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
    const issueOfUsersModel = new IssueOfUsersFormModel();
    issueOfUsersModel.users = this.usersSelected.map(x => x.id);

    issueOfUsersModel.endTime = this.persianDatePickerHelper.getDate(this.endDateTemplate, environment.language === 'fa');
    issueOfUsersModel.startTime = this.persianDatePickerHelper.getDate(this.startDateTemplate, environment.language === 'fa');

    if (issueOfUsersModel.users.length === 0) {
      this.toastr.error(this.translate.instant('Report.UsersCountIsZero'));
      return;
    }

    this.loading = true;
    this.reportService.issueOfUserLikesReport(issueOfUsersModel).subscribe((res: ServerResponseViewModel<any>) => {
      this.reportService.getReportStructure('IssueOfUserLikes').subscribe((item: ServerResponseViewModel<ReportStructureViewModel>) => {
        this.reportService.loadDesignReport(item.data.configuration, res.data, 'IssueOfUserLikes');
      });
    });

  }

}
