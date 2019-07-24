import { MyprofileComponent } from './../myprofile/myprofile.component';
import { ChangePasswordFormModel } from './../dataModels/apiModels/changePasswordFormModel';
import { PresidentType } from './../dataModels/enums/presidentType';
import { environment } from './../../environments/environment.prod';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../dataModels/viewModels/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  currentUser: User;
  isExpanded = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    public translate: TranslateService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {

  }

  get isAdmin() {
    return this.currentUser && this.currentUser.isPresident === PresidentType.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['home']);
  }

  loginModal() {
    const modalRef = this.modalService.open(LoginComponent, { windowClass: '.my-modal', size: 'sm' });
  }

  changePass() {
    const changePasswordModel = new ChangePasswordFormModel();
    changePasswordModel.userId = this.currentUser.id;

    const modalRef = this.modalService.open(MyprofileComponent, { windowClass: '.my-modal', size: 'sm' });
    modalRef.componentInstance.changePasswordModel = changePasswordModel;

    modalRef.result.then(result => {
      if (result === true) {
        this.authenticationService.logout();
      }
    });
  }

}



