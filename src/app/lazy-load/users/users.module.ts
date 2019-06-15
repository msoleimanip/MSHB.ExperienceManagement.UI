import { UsersRoutingModule } from './users-routing.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgbModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [],
  exports: [],
  providers: []
})

export class UsersModule {

}
