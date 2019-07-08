import { AuthenticationComponent } from './authentication.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const authenticationRoutes: Routes = [
  { path: '', component: AuthenticationComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(authenticationRoutes)
  ],
  exports: [
    RouterModule
  ],
})

export class AuthenticationRoutingModule {

}
