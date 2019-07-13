import { environment } from 'src/environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../core/users.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ChangePasswordFormModel } from '../dataModels/apiModels/changePasswordFormModel';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  @Input() changePasswordModel: ChangePasswordFormModel;
  changeForm: FormGroup;
  submitted = false;
  loading = false;
  logout = false;

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private config: NgbModalConfig) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
    this.config.backdrop = true;
    this.config.keyboard = true;

    this.changeForm = this.formBuilder.group({
      userId: [this.changePasswordModel.userId, Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get f() { return this.changeForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.changeForm.invalid) {
      this.toastr.error(this.translate.instant('General.ModelStateError'));
      this.loading = false;
      return;
    }

    if (this.changeForm.get('newPassword').value !== this.changeForm.get('confirmPassword').value) {
      this.toastr.error(this.translate.instant('MyProfile.ConfirmPasswordError'));
      this.loading = false;
      return;
    }

    this.changePasswordModel.newPassword = this.changeForm.get('newPassword').value;
    this.changePasswordModel.currentPassword = this.changeForm.get('currentPassword').value;

    this.usersService.changePassword(this.changePasswordModel).subscribe(res => {
      if (res.data) {
        this.toastr.success(this.translate.instant('MyProfile.AddSuccessfully'));
        this.logout = true;
        this.close();
      }
    }, err => {
      this.loading = false;
    });
  }

  close() {
    this.activeModal.close(this.logout);
  }

}
