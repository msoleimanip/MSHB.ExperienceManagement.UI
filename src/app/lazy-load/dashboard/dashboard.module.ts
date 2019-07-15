import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
     TranslateModule,
     FormsModule,
     RouterModule
  ],
  exports: [],
  providers: []
})

export class DashboardModule {

}
