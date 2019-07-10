import { IssueRoutingModule } from './issue-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { IssueComponent } from './issue.component';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { IssueAddComponent } from './issue-add/issue-add.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    IssueComponent,
    IssueAddComponent
  ],
  imports: [
    CommonModule,
    IssueRoutingModule,
    NgbModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DropzoneModule,
    AngularEditorModule,
  ],
  entryComponents: [
  ]
})
export class IssueModule { }
