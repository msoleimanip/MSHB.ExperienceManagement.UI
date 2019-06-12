import { EquipmentCreateComponent } from './equipment-create/equipment-create.component';
import { EquipmentEditComponent } from './equipment-edit/equipment-edit.component';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EquipmentComponent } from './equipment.component';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EquipmentComponent,
    EquipmentEditComponent,
    EquipmentCreateComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    NgbModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [EquipmentEditComponent, EquipmentCreateComponent],
  exports: [],
  providers: []
})

export class EquipmentModule {

}
