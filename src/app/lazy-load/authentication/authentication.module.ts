import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { AuthenticationAddComponent } from './authentication-add/authentication-add.component';
import { AuthenticationEditComponent } from './authentication-edit/authentication-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AuthenticationComponent,
    AuthenticationAddComponent,
    AuthenticationEditComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    AuthenticationRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [
    AuthenticationAddComponent,
    AuthenticationEditComponent
  ]
})
export class AuthenticationModule { }
