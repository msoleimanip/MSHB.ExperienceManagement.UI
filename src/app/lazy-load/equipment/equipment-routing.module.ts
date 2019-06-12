import { EquipmentComponent } from '../equipment/equipment.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const equipmentRoutes: Routes = [
  { path: '', component: EquipmentComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(equipmentRoutes)
  ],
  exports: [
    RouterModule
  ],
})

export class EquipmentRoutingModule {

}
