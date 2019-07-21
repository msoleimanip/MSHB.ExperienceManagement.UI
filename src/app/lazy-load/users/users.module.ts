import { UsersRoutingModule } from './users-routing.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UserOrganizationPermissionComponent } from './users-organization-permission/users-organization-permission.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UserEquipmentPermissionComponent } from './users-equipment-permission/users-equipment-permission.component';
import { UserActivationComponent } from './user-activation/user-activation.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserOrganizationPermissionComponent,
    UserEquipmentPermissionComponent,
    UsersEditComponent,
    UsersAddComponent,
    UserActivationComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgbModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [
    UserOrganizationPermissionComponent,
    UsersEditComponent,
    UsersAddComponent,
    UserEquipmentPermissionComponent,
    UserActivationComponent
  ],
  exports: [],
  providers: []
})

export class UsersModule {

}
