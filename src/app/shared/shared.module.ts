import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NgModule } from '@angular/core';
import { TreeviewComponent } from './treeview/treeview.component';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './notFound/not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TreeviewComponent,
    AccessDeniedComponent,
    NotFoundComponent
  ],
  exports: [
    TreeviewComponent,
    AccessDeniedComponent,
    NotFoundComponent]
})

export class SharedModule { }
