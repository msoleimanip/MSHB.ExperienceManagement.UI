import { TreeviewComponent } from './../../shared/treeview/treeview.component';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationCreateComponent,
    TreeviewComponent
  ],
  imports: [
    OrganizationRoutingModule,
    CommonModule,
    NgbModule
  ],
  entryComponents: [OrganizationCreateComponent],
  exports: [],
  providers: []
})

export class OrganizationModule {

}
