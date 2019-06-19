import { GroupAuthenticationViewModel } from './../../../dataModels/viewModels/groupAuthenticationViewModel';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { GroupAuthenticationService } from './../../../core/groupAuthentication.service';
import { environment } from './../../../../environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditUserFormModel } from './../../../dataModels/apiModels/editUserFormModel';
import { UsersService } from 'src/app/core/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})

export class UsersEditComponent implements OnInit {

  @Input() editUserModel: EditUserFormModel;
  editForm: FormGroup;
  submitted = false;
  loading = false;
  reloadTable = false;
  isActiveSelect: boolean;
  groupAuthentication: Array<GroupAuthenticationViewModel>;


  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private groupAuthenticationService: GroupAuthenticationService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      username: [this.editUserModel.username, Validators.required],
      password: [''],
      firstName: [this.editUserModel.firstName],
      lastName: [this.editUserModel.lastName],
      description: [this.editUserModel.description],
      location: [this.editUserModel.location],
      isActive: [this.editUserModel.isActive],
      phoneNumber: [this.editUserModel.phoneNumber],
      groupAuthId: [this.editUserModel.groupAuthId, Validators.required]
    });

    this.isActiveSelect = this.editUserModel.isActive;

    this.groupAuthenticationService.getGroupAuthentication()
      .subscribe((res: ServerResponseViewModel<Array<GroupAuthenticationViewModel>>) => {
        this.groupAuthentication = res.data;
      });
  }

  get f() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.editForm.invalid) {
      this.toastr.error(this.translate.instant('Users.ModelStateError'));
      this.loading = false;
      return;
    }

    this.editUserModel.username = this.editForm.get('username').value;
    this.editUserModel.firstName = this.editForm.get('firstName').value;
    this.editUserModel.password = this.editForm.get('password').value;
    this.editUserModel.lastName = this.editForm.get('lastName').value;
    this.editUserModel.description = this.editForm.get('description').value;
    this.editUserModel.location = this.editForm.get('location').value;
    this.editUserModel.isActive = this.editForm.get('isActive').value;
    this.editUserModel.phoneNumber = this.editForm.get('phoneNumber').value;
    this.editUserModel.groupAuthId = this.editForm.get('groupAuthId').value;

    this.usersService.editUser(this.editUserModel).subscribe(res => {
      if (res.data) {
        this.toastr.success(this.translate.instant('Users.EditSuccessfully'), '200');
        this.loading = false;
        this.reloadTable = true;
        this.close();
      }
    }, err => {
      this.loading = false;
    });
  }

  close() {
    this.activeModal.close(this.reloadTable);
  }
}
