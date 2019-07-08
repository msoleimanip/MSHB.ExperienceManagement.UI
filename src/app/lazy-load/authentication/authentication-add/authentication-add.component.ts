import { environment } from '../../../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AddGroupFormModel } from 'src/app/dataModels/apiModels/addGroupFormModel';
import { RoleViewModel } from 'src/app/dataModels/viewModels/roleViewModel';
import { GroupAuthenticationService } from 'src/app/core/group-authentication.service';

@Component({
  selector: 'app-authentication-add',
  templateUrl: './authentication-add.component.html',
  styleUrls: ['./authentication-add.component.css']
})
export class AuthenticationAddComponent implements OnInit {

  @Input() roleItems: Array<RoleViewModel>;
  addGroupModel = new AddGroupFormModel();
  addForm: FormGroup;
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

  get f() { return this.addForm.controls; }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      roleIds: [[], Validators.required]
    });
  }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.addForm.invalid) {
      this.toastr.error(this.translate.instant('Authentication.ModelStateError'));
      this.loading = false;
      return;
    }

    if (this.addForm.get('roleIds').value.length === 0) {
      this.toastr.error('َAuthentication.InputRoleIdsError', '100');
      this.loading = false;
      return;
    }

    try {
      let roleIds = this.addForm.get('roleIds').value;
      this.addGroupModel.roleIds = roleIds.map(item => item.roleId);
      this.addGroupModel.name = this.addForm.get('name').value;
      this.addGroupModel.description = this.addForm.get('description').value;

      this.authGroupService.addGroup(this.addGroupModel).subscribe(res => {
        if (res.data) {
          this.toastr.success(this.translate.instant('Authentication.AddSuccessfully'), res.data);
          this.reloadGroups = true;

          this.submitted = false;
          this.loading = false;
          this.addForm.reset();
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
