import { GroupRoleViewModel } from './../../dataModels/viewModels/groupRoleViewModel';
import { environment } from './../../../environments/environment';
import { GroupAuthenticationViewModel } from './../../dataModels/viewModels/groupAuthenticationViewModel';
import { GroupAuthenticationService } from '../../core/group-authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationAddComponent } from './authentication-add/authentication-add.component';
import { AuthenticationEditComponent } from './authentication-edit/authentication-edit.component';
import { RoleViewModel } from 'src/app/dataModels/viewModels/roleViewModel';
import { EditGroupFormModel } from 'src/app/dataModels/apiModels/editGroupFormModel';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  groupAuthenticationList: Array<GroupAuthenticationViewModel>;

  constructor(private modalService: NgbModal,
    private authGroupService: GroupAuthenticationService,
    public translate: TranslateService,
    private toastr: ToastrService,
    private config: NgbModalConfig) {
    translate.setDefaultLang(environment.language);
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.authGroupService.getGroupAuthentication().subscribe((res: ServerResponseViewModel<Array<GroupAuthenticationViewModel>>) => {
      this.groupAuthenticationList = res.data;
    });
  }

  ngOnDestroy(): void {
    this.config.backdrop = true;
    this.config.keyboard = true;
  }

  create() {
    this.authGroupService.getRoles().subscribe((res: ServerResponseViewModel<Array<RoleViewModel>>) => {
      let modalRef = this.modalService.open(AuthenticationAddComponent, { windowClass: '.my-modal', size: 'lg' });
      modalRef.componentInstance.roleItems = res.data;
      modalRef.result.then(result => {
        if (result === true) {
          this.loadGroups();
        }
      });

    });
  }

  edit(id: number) {
    this.authGroupService.getGroupAuthenticationById(id).subscribe((res: ServerResponseViewModel<GroupRoleViewModel>) => {

      this.authGroupService.getRoles().subscribe((roles: ServerResponseViewModel<Array<RoleViewModel>>) => {
        let modalRef = this.modalService.open(AuthenticationEditComponent, { windowClass: '.my-modal', size: 'lg' });
        modalRef.componentInstance.roleItems = roles.data;

        let editGroupModel = new EditGroupFormModel();
        editGroupModel.name = res.data.name;
        editGroupModel.description = res.data.description;
        editGroupModel.roleIds = res.data.roleIds;
        editGroupModel.groupId = id;
        modalRef.componentInstance.editGroupModel = editGroupModel;

        modalRef.result.then(result => {
          if (result === true) {
            this.loadGroups();
          }
        });
      });
    });
  }

}
