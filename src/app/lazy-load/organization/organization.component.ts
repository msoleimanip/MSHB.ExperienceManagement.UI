import { environment } from './../../../environments/environment';
import { ServerResponseDto } from './../../dataModels/serverResponseDto';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationDto } from '../../dataModels/organizationDto';
import { OrganizationService } from 'src/app/core/organization.service';


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
              private orgService: OrganizationService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
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
    if (this.parentOrg && this.parentOrg.id !== 0) {
      this.orgService.getOrganization(this.parentOrg.id).subscribe(res => {
        const modalRef = this.modalService.open(OrganizationEditComponent, { windowClass: '.my-modal', size: 'lg' });
        modalRef.componentInstance.organization = res.data;
        modalRef.componentInstance.parentsTitle = this.parentOrg.organizationName;
      });
    }
  }

}



