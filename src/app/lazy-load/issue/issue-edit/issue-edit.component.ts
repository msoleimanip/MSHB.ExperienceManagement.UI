import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { User } from 'src/app/dataModels/viewModels/user';
import { EquipmentAttachmentViewModel } from 'src/app/dataModels/viewModels/equipmentAttachmentViewModel';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { IssueService } from 'src/app/core/issue.service';
import { EquipmentService } from 'src/app/core/equipment.service';
import { environment } from 'src/environments/environment.prod';
import { EquipmentAttachmentUserFormModel } from 'src/app/dataModels/apiModels/equipmentAttachmentUserFormModel';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { ImageData } from './../../../dataModels/interfaces/imageData';
import { EditIssueDetailFormModel } from 'src/app/dataModels/apiModels/editIssueDetailFormModel';
import { IssueDetailAttachmentViewModel } from 'src/app/dataModels/viewModels/issueDetailAttachmentViewModel';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {

  @Input() equipmentIds: Array<number>;
  @Input() equipmentAttachments: Array<EquipmentAttachmentViewModel>;
  @Input() equipmentAttachmentIds: Array<number>;
  @Input() editIssueDetailModel: EditIssueDetailFormModel;
  editForm: FormGroup;
  @ViewChild('dz') drpzone: DropzoneComponent;
  currentUser: User;
  submit = false;
  loading = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '350px;',
    minWidth: '100%',
    placeholder: 'Enter text here...',
    translate: 'no',
  };

  dropdownSettings = {
    singleSelection: false, idField: 'equipmentAttachmentId', textField: 'equipmentAttachmentName',
    selectAllText: this.translate.instant('General.SelectAllText'),
    unSelectAllText: this.translate.instant('General.UnSelectAllText'), itemsShowLimit: 3, allowSearchFilter: true
  };

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService,
    private authenticationService: AuthenticationService,
    private issueService: IssueService,
    private equipmentService: EquipmentService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
    let equipmentAttachmentSelectedIds = this.equipmentAttachments.filter(x => this.equipmentAttachmentIds.includes(x.equipmentAttachmentId));

    this.editForm = this.formBuilder.group({
      caption: [this.editIssueDetailModel.caption, Validators.required],
      text: [this.editIssueDetailModel.text, Validators.required],
      equipmentAttachmentIds: [equipmentAttachmentSelectedIds]
    });
  }

  get f() { return this.editForm.controls; }

  close() {
    this.activeModal.close(undefined);
  }

  onSubmit() {

    if (this.editForm.invalid) {
      this.toastr.warning(this.translate.instant('General.ModelStateError'));
      return;
    }


    const eqAttachmentIds = this.editForm.get('equipmentAttachmentIds').value;
    this.editIssueDetailModel.equipmentAttachmentIds = eqAttachmentIds.map(item => item.equipmentAttachmentId);
    this.editIssueDetailModel.caption = this.editForm.get('caption').value;
    this.editIssueDetailModel.text = this.editForm.get('text').value;


    this.loading = true;
    this.issueService.editIssueDetails(this.editIssueDetailModel).subscribe(res => {
      this.toastr.success(this.translate.instant('General.EditSuccessfully'));
      this.loading = false;
      this.activeModal.close(this.editIssueDetailModel);
    }, error => {
      this.loading = false;
    });
  }
}
