import { OrganizationComponent } from '../organization/organization.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const organizationRoutes: Routes = [
  { path: '', component: OrganizationComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(organizationRoutes)
  ],
  exports: [
    RouterModule
  ],
})

export class OrganizationRoutingModule {

}
