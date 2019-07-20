import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './../../core/authentication.service';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { IssueService } from './../../core/issue.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchIssueFormModel } from 'src/app/dataModels/apiModels/searchIssueFormModel';
import { SearchIssueViewModel } from 'src/app/dataModels/viewModels/searchIssueViewModel';
import { IssueType } from 'src/app/dataModels/enums/issueType';
import { EquipmentService } from 'src/app/core/equipment.service';
import { User } from 'src/app/dataModels/viewModels/user';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IssueChangeComponent } from './issue-change/issue-change.component';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit, OnDestroy {

  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Drop files here',
    acceptedFileTypes: 'image/jpeg, image/png'
  };
  @ViewChild('myPond') myPond: any;

  pondFiles = [];

  files: any[];
  selectedIds = [];
  issueTypesSelect: any;
  loading = false;
  issueType = IssueType;

  searchModel = new SearchIssueFormModel();
  issues = new SearchIssueViewModel();
  currentUser: User;

  constructor(private modalService: NgbModal,
    private issueService: IssueService,
    private equipmentService: EquipmentService,
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    private toastr: ToastrService,
    private config: NgbModalConfig) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    config.backdrop = 'static';
    config.keyboard = false;
  }


  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  ngOnInit() {
    this.loadTree();
    this.issueTypesSelect = Object.keys(IssueType).filter(Number).map(key => ({ title: IssueType[key], value: key }));
    this.loadIssue();
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

  change(issueId: number, isActive: boolean) {
    const modalRef = this.modalService.open(IssueChangeComponent, { windowClass: '.my-modal', size: 'sm' });
    modalRef.componentInstance.isuueId = issueId;
    modalRef.componentInstance.isActive = isActive;

    modalRef.result.then(result => {
      if (result === true) {
        try {
          this.issues.searchIssueViewModel.find(x => x.id === issueId).isActive = !isActive;
        } catch { }
      }
    });
  }
}

