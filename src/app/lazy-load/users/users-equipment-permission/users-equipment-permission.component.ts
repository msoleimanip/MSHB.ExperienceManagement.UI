import { UserEquipmentAssignFormModel } from './../../../dataModels/apiModels/userEquipmentAssignFormModel';
import { environment } from './../../../../environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { EquipmentService } from 'src/app/core/equipment.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from 'src/app/core/users.service';

@Component({
  selector: 'app-users-equipment-permission',
  templateUrl: './users-equipment-permission.component.html',
  styleUrls: ['./users-equipment-permission.component.css']
})
export class UserEquipmentPermissionComponent implements OnInit {

  @Input() userId: string;
  selectedIds = [];
  files: any[];
  submitted = false;
  loading = false;

  constructor(public activeModal: NgbActiveModal,
    private equipmentService: EquipmentService,
    private usersService: UsersService,
    private toastr: ToastrService,
    private translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }


  ngOnInit(): void {
    this.equipmentService.getEquipmentForUser(this.userId).subscribe(res => {
      this.files = res.data;
    });
  }

  treeClick(param: any) {
    if (param) {
      this.selectedIds = param;
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.selectedIds.length === 0 || !this.userId) {
      this.toastr.error(this.translate.instant('Users.ModelStateError'));
      this.loading = false;
      return;
    } else {
      const userOrgAssignModel = new UserEquipmentAssignFormModel();
      userOrgAssignModel.userId = this.userId;
      userOrgAssignModel.equipmentIds = this.selectedIds;

      this.usersService.userEquipmentAssign(userOrgAssignModel).subscribe(res => {
        if (res.data) {
          this.toastr.success(this.translate.instant('Users.UpdatePermissionSuccessfully'));
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
