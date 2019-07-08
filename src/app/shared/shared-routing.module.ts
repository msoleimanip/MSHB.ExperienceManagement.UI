import { Routes, RouterModule } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgModule } from '@angular/core';


const sharedRoutes: Routes = [
  {
    path: 'accessDenied',
    component: AccessDeniedComponent
  },
  {
    path: 'contactUs',
    component: ContactUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(sharedRoutes)],
  exports: []
})
export class SharedRoutingModule { }
