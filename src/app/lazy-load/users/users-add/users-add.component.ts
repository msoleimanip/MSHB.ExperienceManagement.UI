import { AddUserFormModel } from '../../../dataModels/apiModels/addUserFormModel';
import { GroupAuthenticationViewModel } from '../../../dataModels/viewModels/groupAuthenticationViewModel';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { GroupAuthenticationService } from '../../../core/groupAuthentication.service';
import { environment } from '../../../../environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.css']
})

export class UsersAddComponent implements OnInit {

  addUserModel = new AddUserFormModel();
  addForm: FormGroup;
  submitted = false;
  loading = false;
  isActiveSelect = false;
  groupAuthentication: Array<GroupAuthenticationViewModel>;


  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private groupAuthenticationService: GroupAuthenticationService) {
    translate.setDefaultLang(environment.language);
    this.addUserModel.isActive = false;
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      description: [''],
      location: [''],
      isActive: [this.addUserModel.isActive],
      groupAuthId: ['']
    });

    this.groupAuthenticationService.getGroupAuthentication()
      .subscribe((res: ServerResponseViewModel<Array<GroupAuthenticationViewModel>>) => {
        this.groupAuthentication = res.data;
      });
  }

  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.addForm.invalid) {
      this.toastr.error(this.translate.instant('Organization.ModelStateError'));
      this.loading = false;
      return;
    }

    // this.organization.organizationName = this.createForm.get('organizationName').value;
    // this.organization.description = this.createForm.get('description').value;

    this.usersService.addUser(this.addUserModel).subscribe(res => {
      if (res.data) {
        this.toastr.success(this.translate.instant('Organization.AddSuccessfully'), res.data);
        this.submitted = false;
        this.loading = false;
      }
    }, err => {
      this.loading = false;
    });
  }

  close() {
    this.activeModal.close(true);
  }
}
