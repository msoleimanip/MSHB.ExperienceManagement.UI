import { EditUserFormModel } from './../../dataModels/apiModels/editUserFormModel';
import { NgbdSortableHeader, SortEvent } from './../../_directives/sortable.directive';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UserOrganizationPermissionComponent } from './users-organization-permission/users-organization-permission.component';
import { UserViewModel } from './../../dataModels/viewModels/userViewModel';
import { environment } from './../../../environments/environment';
import { Component, OnInit, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from 'src/app/core/users.service';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SearchUserFormModel } from 'src/app/dataModels/apiModels/searchUserFormModel';
import { SearchUserViewModel } from 'src/app/dataModels/viewModels/searchUserViewModel';
import { UserEquipmentPermissionComponent } from './users-equipment-permission/users-equipment-permission.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, OnDestroy {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  searchModel = new SearchUserFormModel();
  users = new SearchUserViewModel();
  loading = false;

  constructor(public translate: TranslateService,
    private usersService: UsersService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private config: NgbModalConfig) {
    translate.setDefaultLang(environment.language);
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.config.backdrop = true;
    this.config.keyboard = true;
  }

  loadUsers() {
    this.loading = true;
    this.usersService.getUsers(this.searchModel).subscribe((res: ServerResponseViewModel<SearchUserViewModel>) => {
      this.users = res.data;
      this.loading = false;
    }, err => {
      this.loading = false;
    });
  }

  changeOrgPermission(userId: string) {

    const modalRef = this.modalService.open(UserOrganizationPermissionComponent, { windowClass: '.my-modal', size: 'lg' });
    modalRef.componentInstance.userId = userId;
  }


  changeEquiomentPermission(userId: string) {

    const modalRef = this.modalService.open(UserEquipmentPermissionComponent, { windowClass: '.my-modal', size: 'lg' });
    modalRef.componentInstance.userId = userId;
  }


  edit(userId: string) {
    this.usersService.getUserById(userId).subscribe((res: ServerResponseViewModel<UserViewModel>) => {
      const modalRef = this.modalService.open(UsersEditComponent, { windowClass: '.my-modal', size: 'lg' });
      let model = new EditUserFormModel();
      model.userId = res.data.id;
      model.description = res.data.description;
      model.firstName = res.data.firstName;
      model.groupAuthId = res.data.groupAuthId;
      model.isActive = res.data.isActive;
      model.lastName = res.data.lastName;
      model.location = res.data.location;
      model.phoneNumber = res.data.phoneNumber;
      model.username = res.data.username;

      modalRef.componentInstance.editUserModel = model;

      modalRef.result.then(result => {
        if (result === true) {
          this.loadUsers();
        }
      });
    });
  }

  create() {
    const modalRef =  this.modalService.open(UsersAddComponent, { windowClass: '.my-modal', size: 'lg' });
    modalRef.result.then(result => {
      if (result === true) {
        this.loadUsers();
      }
    });
  }

  onSort({ column, direction }: SortEvent) {
    this.searchModel.sortModel.sort = direction;
    this.searchModel.sortModel.col = column;
    this.loadUsers();
  }
}



