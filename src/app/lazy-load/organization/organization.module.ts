import { TranslateModule } from '@ngx-translate/core';
import { TreeviewComponent } from './../../shared/treeview/treeview.component';
import { CommonModule } from '@angular/common';
import { OrganizationComponent } from './organization.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    OrganizationComponent,
    OrganizationEditComponent,
    TreeviewComponent
  ],
  imports: [
    OrganizationRoutingModule,
    CommonModule,
    NgbModule,
    TranslateModule
  ],
  entryComponents: [OrganizationEditComponent],
  exports: [],
  providers: []
})

export class OrganizationModule {

}
