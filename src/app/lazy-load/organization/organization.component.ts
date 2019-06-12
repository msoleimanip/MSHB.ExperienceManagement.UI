import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { environment } from './../../../environments/environment';
import { ServerResponseDto } from './../../dataModels/serverResponseDto';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationDto } from '../../dataModels/organizationDto';
import { OrganizationService } from 'src/app/core/organization.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})

export class OrganizationComponent implements OnInit {
  files: any[];
  parentOrg = new OrganizationDto();

  constructor(private modalService: NgbModal,
    public translate: TranslateService,
    private orgService: OrganizationService,
    private toastr: ToastrService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
    this.loadTree();
  }

  loadTree() {
    this.orgService.getTree().subscribe((res: ServerResponseDto<any>) => {
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
      this.orgService.getOrganization(this.parentOrg.id).subscribe(res => {
        let modalRef = this.modalService.open(OrganizationEditComponent, { windowClass: '.my-modal', size: 'lg' });
        modalRef.componentInstance.organization = res.data;
        modalRef.componentInstance.parentsTitle = this.parentOrg.organizationName;
      });
    } else {
      this.toastr.error(this.translate.instant('Organization.TreeNotSelectedError'));
    }
  }

  create() {
    if (this.parentOrg.id && this.parentOrg.id !== 0) {
      let modalRef = this.modalService.open(OrganizationCreateComponent, { windowClass: '.my-modal', size: 'lg' });
      modalRef.componentInstance.parentsTitle = this.parentOrg.organizationName;
      let organization = new OrganizationDto();
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



