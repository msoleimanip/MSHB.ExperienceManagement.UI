import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { TranslateModule } from '@ngx-translate/core';
import { TreeviewComponent } from './../../shared/treeview/treeview.component';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationEditComponent,
    OrganizationCreateComponent,
    TreeviewComponent
  ],
  imports: [
    OrganizationRoutingModule,
    CommonModule,
    NgbModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [OrganizationEditComponent, OrganizationCreateComponent],
  exports: [],
  providers: []
})

export class OrganizationModule {

}
