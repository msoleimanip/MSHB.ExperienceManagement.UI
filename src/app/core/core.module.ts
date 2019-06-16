import { GroupAuthenticationService } from './groupAuthentication.service';
import { UsersService } from './users.service';
import { EquipmentService } from './equipment.service';
import { OrganizationService } from './organization.service';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    OrganizationService,
    EquipmentService,
    UsersService,
    GroupAuthenticationService
  ]
})

export class CoreModule {

}
