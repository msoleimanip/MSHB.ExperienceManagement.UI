import { IssueAddComponent } from './issue-add/issue-add.component';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './../../core/authentication.service';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { IssueService } from './../../core/issue.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchIssueFormModel } from 'src/app/dataModels/apiModels/searchIssueFormModel';
import { SearchIssueViewModel } from 'src/app/dataModels/viewModels/searchIssueViewModel';
import { IssueType } from 'src/app/dataModels/enums/issueType';
import { EquipmentService } from 'src/app/core/equipment.service';
import { User } from 'src/app/dataModels/viewModels/user';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit, OnDestroy {

  files: any[];
  selectedIds = [];
  issueTypesSelect: any;
  loading = false;
  issueType = IssueType;

  searchModel = new SearchIssueFormModel();
  issues: SearchIssueViewModel;
  currentUser: User;

  constructor(private modalService: NgbModal,
              private issueService: IssueService,
              private equipmentService: EquipmentService,
              private authenticationService: AuthenticationService,
              public translate: TranslateService,
              private toastr: ToastrService,
              private config: NgbModalConfig) {
                this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.loadTree();
    this.issueTypesSelect = Object.keys(IssueType).filter(Number).map(key => ({ title: IssueType[key], value: key }));
  }

  ngOnDestroy() {
    this.config.backdrop = true;
    this.config.keyboard = true;
  }

  loadTree() {
    this.equipmentService.getTree().subscribe(res => {
      this.files = res.data;
    });
  }

  treeClick(param: any) {
    if (param) {
      this.selectedIds = param;
    }
  }

  loadIssue() {
    if (!this.selectedIds || this.selectedIds.length === 0) {
      this.toastr.error(this.translate.instant('General.TreeNotSelectedError'));
      return;
    }


    this.searchModel.userId = this.currentUser.id;
    this.searchModel.equipmentIds = this.selectedIds;

    this.loading = true;
    this.issueService.getIssuesForUser(this.searchModel).subscribe((res: ServerResponseViewModel<SearchIssueViewModel>) => {
      this.issues = res.data;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }
}



// http://angular-multi-step-wizard.azurewebsites.net/#/address
