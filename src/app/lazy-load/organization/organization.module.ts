import { CommonModule } from '@angular/common';
import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { TranslateModule } from '@ngx-translate/core';
import { OrganizationComponent } from './organization.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationEditComponent,
    OrganizationCreateComponent
  ],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    NgbModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [OrganizationEditComponent, OrganizationCreateComponent],
  exports: [],
  providers: []
})

export class OrganizationModule {

}
