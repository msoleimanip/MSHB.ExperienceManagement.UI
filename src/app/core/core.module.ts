import { IssueService } from './issue.service';
import { GroupAuthenticationService } from 'src/app/core/group-authentication.service';
import { OrganizationService } from 'src/app/core/organization.service';
import { EquipmentService } from 'src/app/core/equipment.service';
import { ReportService } from './report.service';
import { FileService } from './upload.service';
import { PersianDatePickerHelper } from './persianDatePickerHelper';
import { UsersService } from './users.service';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    UsersService,
    GroupAuthenticationService,
    PersianDatePickerHelper,
    FileService,
    ReportService,
    EquipmentService,
    OrganizationService,
    IssueService
  ]
})

export class CoreModule {

}
