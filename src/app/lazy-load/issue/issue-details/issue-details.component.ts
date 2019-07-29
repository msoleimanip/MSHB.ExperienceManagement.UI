import { EquipmentService } from 'src/app/core/equipment.service';
import { EquipmentAttachmentViewModel } from './../../../dataModels/viewModels/equipmentAttachmentViewModel';
import { EquipmentAttachmentUserFormModel } from './../../../dataModels/apiModels/equipmentAttachmentUserFormModel';
import { IssueDetailViewModel } from './../../../dataModels/viewModels/issueDetailViewModel';
import { IssueService } from 'src/app/core/issue.service';
import { AuthenticationService } from './../../../core/authentication.service';
import { AddIssueDetailFormModel } from './../../../dataModels/apiModels/addIssueDetailFormModel';
import { environment } from 'src/environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ImageData } from './../../../dataModels/interfaces/imageData';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { User } from 'src/app/dataModels/viewModels/user';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {

  @Input() issueId: number;
  @Input() equipmentIds: Array<number>;
  addForm: FormGroup;
  @ViewChild('dz') drpzone: DropzoneComponent;
  currentUser: User;
  submit = false;
  loading = false;

  public config: DropzoneConfigInterface;
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

  equipmentAttachments = [];

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
    this.addForm = this.formBuilder.group({
      caption: ['', Validators.required],
      text: ['', Validators.required],
      uploadFiles: [new Array<ImageData>()],
      equipmentAttachmentIds: [new Array<number>()]
    });

    // load EquipmentAttachment for Step 2
    const model = new EquipmentAttachmentUserFormModel();
    model.equipmentIds = this.equipmentIds;
    this.equipmentService.getEquipmentAttachmentForUser(model)
      .subscribe((arg: ServerResponseViewModel<Array<EquipmentAttachmentViewModel>>) => {
        this.equipmentAttachments = arg.data;
      });

    this.config = {
      clickable: true,
      maxFiles: 10,
      autoReset: null,
      errorReset: null,
      cancelReset: null,
      addRemoveLinks: true,
      url: 'api/file/upload',
      headers: {
        Authorization: `Bearer ${this.currentUser.token}`
      },
      createImageThumbnails: true
    };
  }

  get f() { return this.addForm.controls; }



  public onUploadError(args: any): void {
    this.toastr.error(this.translate.instant('General.UploadError'));
  }

  public onUploadSuccess(result: any): void {
    if (result && result.length > 0) {
      if (result[1].data !== '') {
        const fileIds = this.addForm.get('uploadFiles').value as Array<ImageData>;
        fileIds.push({ id: result[1].data, uuid: result[0].upload.uuid });
        this.addForm.controls.uploadFiles.setValue(fileIds);
      }
    }
  }

  onRemoveFile(result: any) {
    const fileList = this.addForm.get('uploadFiles').value as Array<ImageData>;
    const index = fileList.findIndex(x => x.uuid === result.upload.uuid);
    fileList.splice(index, 1);
    this.addForm.controls.uploadFiles.setValue(fileList);
  }

  resetUploader() {
    this.drpzone.directiveRef.reset();
  }

  onSubmit() {
    this.submit = true;

    if (!this.issueId) {
      this.toastr.error(this.translate.instant('General.ModelStateError'));
      return;
    }

    if (this.addForm.invalid) {
      this.toastr.error(this.translate.instant('General.ModelStateError'));
      return;
    }

    this.loading = true;

    const addIssueDetailModel = new AddIssueDetailFormModel();
    addIssueDetailModel.userId = this.currentUser.id;
    addIssueDetailModel.issueId = this.issueId;
    addIssueDetailModel.text = this.addForm.get('text').value;
    addIssueDetailModel.caption = this.addForm.get('caption').value;
    addIssueDetailModel.uploadFiles = (this.addForm.get('uploadFiles').value as Array<ImageData>).map(x => x.id);

    const eqAttachmentIds = this.addForm.get('equipmentAttachmentIds').value;
    addIssueDetailModel.equipmentAttachmentIds = eqAttachmentIds.map(item => item.equipmentAttachmentId);

    this.issueService.addIssueDetails(addIssueDetailModel).subscribe((res: ServerResponseViewModel<IssueDetailViewModel>) => {
      this.loading = false;
      this.toastr.success(this.translate.instant('General.AddSuccessfully'));
      this.activeModal.close(res.data);
    }, error => {
      this.loading = false;
    });
  }

  close() {
    this.activeModal.close(undefined);
  }

}
