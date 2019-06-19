import { UserOrgAssignFormModel } from './../../../dataModels/apiModels/userOrgAssignFormModel';
import { OrganizationViewModel } from './../../../dataModels/viewModels/organizationViewModel';
import { environment } from './../../../../environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { OrganizationService } from 'src/app/core/organization.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from 'src/app/core/users.service';

@Component({
  selector: 'app-users-organization-permission',
  templateUrl: './users-organization-permission.component.html',
  styleUrls: ['./users-organization-permission.component.css']
})
export class UserOrganizationPermissionComponent implements OnInit {

  @Input() userId: string;
  files: any[];
  loading = false;
  parentOrg = new OrganizationViewModel();

  constructor(public activeModal: NgbActiveModal,
              private organizationService: OrganizationService,
              private usersService: UsersService,
              private toastr: ToastrService,
              private translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }


  ngOnInit(): void {
    this.organizationService.getUserOrgazinationForUser(this.userId).subscribe(res => {
      this.files = res.data;
    });
  }

  treeClick(param: any) {
    if (param.id && param.id !== 0) {
      this.parentOrg.organizationName = param.parents;
      this.parentOrg.id = param.id;
    }
  }

  onSubmit() {
    this.loading = true;
    if (!this.parentOrg.id || !this.userId) {
      this.toastr.error(this.translate.instant('Users.ModelStateError'));
      this.loading = false;
      return;
    } else {
      const userOrgAssignModel = new UserOrgAssignFormModel();
      userOrgAssignModel.userId = this.userId;
      userOrgAssignModel.organizationId = this.parentOrg.id;

      this.usersService.userOrganizationAssign(userOrgAssignModel).subscribe(res => {
        if (res.data) {
          this.toastr.success(this.translate.instant('Users.AddSuccessfully'), '100');
          this.loading = false;
          this.close();
        }
      }, err => {
        this.loading = false;
      });
    }
  }

  close() {
    this.activeModal.close(true);
  }

}
