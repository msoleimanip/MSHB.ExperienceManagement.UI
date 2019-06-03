import { ServerResponseDto } from './../../dataModels/serverResponseDto';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrganizationDto } from '../../dataModels/organizationDto';
import { OrganizationService } from 'src/app/core/organizationService';
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
    translate.setDefaultLang('fa');
  }

  ngOnInit() {
    this.orgService.getTree().subscribe((res: ServerResponseDto<any>) => {
      this.files = res.data;
    }, err => {
      this.toastr.error(err.statusText, err.status.toString());
    });
  }

  treeSelectedChange(param: any) {
    console.log(param);
    this.parentOrg.organizationName = 'Hamed Bagheri';
  }

  open(param: any) {
    const modalRef = this.modalService.open(OrganizationEditComponent, { windowClass: '.my-modal', size: 'lg' });
    modalRef.componentInstance.name = 'World';
  }
    
  showAlert() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

}



