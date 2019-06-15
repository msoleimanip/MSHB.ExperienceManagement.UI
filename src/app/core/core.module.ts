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
    UsersService
  ]
})

export class CoreModule {

}
