import { OrganizationViewModel } from './../../../dataModels/viewModels/organizationViewModel';
import { environment } from './../../../../environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from 'src/app/core/organization.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users-organization-permission',
  templateUrl: './users-organization-permission.component.html',
  styleUrls: ['./users-organization-permission.component.css']
})
export class UserOrganizationPermissionComponent implements OnInit {

  @Input() userId: string;
  files: any[];
  changeForm: FormGroup;
  submitted = false;
  loading = false;
  parentOrg = new OrganizationViewModel();

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private toastr: ToastrService   ) {
  }


  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      organizationId: ['', Validators.required]
    });

    this.organizationService.getUserOrgazinationForUser(this.userId).subscribe(res =>{
      this.files = res.data;
    });
  }

  treeClick(param: any) {
    if (param.id && param.id !== 0) {
      this.parentOrg.organizationName = param.parents;
      this.parentOrg.id = param.id;
    }
  }

  get f() { return this.changeForm.controls; }

  onSubmit() {
    // this.submitted = true;
    // this.loading = true;
    // if (this.createForm.invalid) {
    //   this.toastr.error(this.translate.instant('Organization.ModelStateError'));
    //   this.loading = false;
    //   return;
    // }
  }

  close() {
    this.activeModal.close(true);
  }

}
