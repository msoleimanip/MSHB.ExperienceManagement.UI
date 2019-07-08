import { environment } from '../../../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { RoleViewModel } from 'src/app/dataModels/viewModels/roleViewModel';
import { GroupAuthenticationService } from 'src/app/core/group-authentication.service';
import { EditGroupFormModel } from 'src/app/dataModels/apiModels/editGroupFormModel';

@Component({
  selector: 'app-authentication-edit',
  templateUrl: './authentication-edit.component.html',
  styleUrls: ['./authentication-edit.component.css']
})
export class AuthenticationEditComponent implements OnInit {

  @Input() editGroupModel: EditGroupFormModel;
  @Input() roleItems: Array<RoleViewModel>;
  editForm: FormGroup;
  submitted = false;
  reloadGroups = false;
  loading = false;
  dropdownSettings = {
    singleSelection: false, idField: 'roleId', textField: 'title', selectAllText: this.translate.instant('Authentication.SelectAllText'),
    unSelectAllText: this.translate.instant('Authentication.UnSelectAllText'), itemsShowLimit: 3, allowSearchFilter: true
  };

  constructor(public activeModal: NgbActiveModal,
    private authGroupService: GroupAuthenticationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }

  get f() { return this.editForm.controls; }

  ngOnInit() {

    const rolesSelected = this.roleItems.filter(x => this.editGroupModel.roleIds.includes(x.roleId));

    this.editForm = this.formBuilder.group({
      name: [this.editGroupModel.name, Validators.required],
      description: [this.editGroupModel.description],
      roleIds: [rolesSelected, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.editForm.invalid) {
      this.toastr.error(this.translate.instant('Authentication.ModelStateError'));
      this.loading = false;
      return;
    }

    if (this.editForm.get('roleIds').value.length === 0) {
      this.toastr.error('َAuthentication.InputRoleIdsError', '100');
      this.loading = false;
      return;
    }

    try {
      let roleIds = this.editForm.get('roleIds').value;
      this.editGroupModel.roleIds = roleIds.map(item => item.roleId);
      this.editGroupModel.name = this.editForm.get('name').value;
      this.editGroupModel.description = this.editForm.get('description').value;

      this.authGroupService.editGroup(this.editGroupModel).subscribe(res => {
        if (res.data) {
          this.toastr.success(this.translate.instant('Authentication.AddSuccessfully'), res.data);
          this.reloadGroups = true;

          this.submitted = false;
          this.loading = false;
          this.reloadGroups = true;
          this.close();
        }
      }, err => {
        this.loading = false;
      });
    } catch (error) {
      this.toastr.error(error.message);
    }
  }

  close() {
    this.activeModal.close(this.reloadGroups);
  }
}
