import { OrganizationViewModel } from './../../dataModels/viewModels/organizationViewModel';
import { EditOrgFormModel } from './../../dataModels/apiModels/editOrgFormModel';
import { AddOrgFormModel } from './../../dataModels/apiModels/addOrgFormModel';
import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { environment } from './../../../environments/environment';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationService } from 'src/app/core/organization.service';
import { ToastrService } from 'ngx-toastr';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})

export class OrganizationComponent implements OnInit, OnDestroy {
  files: any[];
  parentOrg = new OrganizationViewModel();

  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private orgService: OrganizationService,
    private toastr: ToastrService,
    private config: NgbModalConfig) {
    translate.setDefaultLang(environment.language);
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.loadTree();
  }

  ngOnDestroy(): void {
    this.config.backdrop = true;
    this.config.keyboard = true;
  }
  loadTree() {
    this.orgService.getTree().subscribe(res => {
      this.files = res.data;
    });
  }

  treeClick(param: any) {
    if (param.id && param.id !== 0) {
      this.parentOrg.organizationName = param.parents;
      this.parentOrg.id = param.id;
    }
  }

  edit() {
    if (this.parentOrg.id && this.parentOrg.id !== 0) {
      this.orgService.getOrganization(this.parentOrg.id).subscribe((res: ServerResponseViewModel<OrganizationViewModel>) => {

        let editModel = new EditOrgFormModel();
        editModel.organizationId = res.data.id;
        editModel.organizationName = res.data.organizationName;
        editModel.description = res.data.description;
        editModel.parentId = res.data.parentId;

        let modalRef = this.modalService.open(OrganizationEditComponent, { windowClass: '.my-modal', size: 'lg' });
        modalRef.componentInstance.organization = editModel;
        modalRef.componentInstance.parentsTitle = this.parentOrg.organizationName;
        modalRef.result.then(result => {
          if (result === true) {
            this.loadTree();
          }
        });
      });
    } else {
      this.toastr.error(this.translate.instant('Organization.TreeNotSelectedError'));
    }
  }

  create() {
    if (this.parentOrg.id && this.parentOrg.id !== 0) {
      let modalRef = this.modalService.open(OrganizationCreateComponent, { windowClass: '.my-modal', size: 'lg' });
      modalRef.componentInstance.parentsTitle = this.parentOrg.organizationName;
      let organization = new AddOrgFormModel();
      organization.parentId = this.parentOrg.id;
      modalRef.componentInstance.organization = organization;
      modalRef.result.then(result => {
        if (result === true) {
          this.loadTree();
        }
      });
    } else {
      this.toastr.error(this.translate.instant('Organization.TreeNotSelectedError'));
    }
  }

}



