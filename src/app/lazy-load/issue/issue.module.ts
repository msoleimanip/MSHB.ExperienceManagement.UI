import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { NgxGalleryModule } from 'ngx-gallery';
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
import { IssueSearchComponent } from './issue-search/issue-search.component';
import { IssueDisplayComponent } from './issue-display/issue-display.component';
import { IssuePlayerComponent } from './issue-player/issue-player.component';
import { IssueChangeComponent } from './issue-change/issue-change.component';
import { IssueEditComponent } from './issue-edit/issue-edit.component';


@NgModule({
  declarations: [
    IssueComponent,
    IssueAddComponent,
    IssueSearchComponent,
    IssueDisplayComponent,
    IssuePlayerComponent,
    IssueDetailsComponent,
    IssueChangeComponent,
    IssueEditComponent
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
    NgxGalleryModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [
    IssuePlayerComponent,
    IssueDetailsComponent,
    IssueChangeComponent,
    IssueEditComponent
  ]
})
export class IssueModule { }
