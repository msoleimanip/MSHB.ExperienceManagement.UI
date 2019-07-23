import { NgxGalleryModule } from 'ngx-gallery';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
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
import { EquipmentAttachmentComponent } from './equipment-attachment/equipment-attachment.component';


@NgModule({
  declarations: [
    EquipmentComponent,
    EquipmentEditComponent,
    EquipmentCreateComponent,
    EquipmentAttachmentComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    NgbModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DropzoneModule,
    NgxGalleryModule
  ],
  entryComponents: [EquipmentEditComponent, EquipmentCreateComponent, EquipmentAttachmentComponent],
  exports: [],
  providers: []
})

export class EquipmentModule {

}
