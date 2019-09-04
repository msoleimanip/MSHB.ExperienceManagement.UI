import { EquipmentAttachmentViewModel } from './../../../dataModels/viewModels/equipmentAttachmentViewModel';
import { EquipmentAttachmentUserFormModel } from './../../../dataModels/apiModels/equipmentAttachmentUserFormModel';
import { IssueDetailViewModel } from './../../../dataModels/viewModels/issueDetailViewModel';
import { ImageData } from './../../../dataModels/interfaces/imageData';
import { AddIssueDetailFormModel } from './../../../dataModels/apiModels/addIssueDetailFormModel';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { AddIssueFormModel } from './../../../dataModels/apiModels/addIssueFormModel';
import { EquipmentService } from './../../../core/equipment.service';
import { IssueType } from 'src/app/dataModels/enums/issueType';
import { CustomeStepper } from './../../../dataModels/generalModels/customStepper';
import { AuthenticationService } from './../../../core/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from './../../../../environments/environment.prod';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { DropzoneConfigInterface, DropzoneComponent } from 'ngx-dropzone-wrapper';
import { User } from 'src/app/dataModels/viewModels/user';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IssueService } from 'src/app/core/issue.service';
import { ActivateIssueFormModel } from 'src/app/dataModels/apiModels/activateIssueFormModel';
import { Router } from '@angular/router';
import { DeleteIssueFormModel } from 'src/app/dataModels/apiModels/DeleteIssueFormModel';

@Component({
  selector: 'app-issue-add',
  templateUrl: './issue-add.component.html',
  styleUrls: ['./issue-add.component.css']
})
export class IssueAddComponent implements OnInit {

  private stepper: CustomeStepper;
  subStepp1 = false;
  subStepp2 = false;
  reloadIssues = false;
  loading = false;
  issueId: number;
  issueDetailsId: number;

  step1Form: FormGroup;
  step2Form: FormGroup;

  public configStep1: DropzoneConfigInterface;
  public configStep2: DropzoneConfigInterface;
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

  currentUser: User;
  issueTypesSelect: any;
  issueType = IssueType;

  files: any[];
  selectedIds = [];
  equipmentAttachments = [];

  @ViewChild('dz') drpzone: DropzoneComponent;


  constructor(
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private issueService: IssueService,
    private equipmentService: EquipmentService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private router: Router) {
    translate.setDefaultLang(environment.language);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.issueTypesSelect = Object.keys(IssueType).filter(Number).map(key => ({ title: IssueType[key], value: key }));

    this.stepper = new CustomeStepper(document.querySelector('#issueStepper'), {
      linear: true,
      animation: true
    });

    this.step1Form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageId: ['', Validators.required],
      issueType: ['', Validators.required],
      userId: [this.currentUser.id, Validators.required],
      equipmentIds: [new Array<number>(), Validators.required]
    });

    this.step2Form = this.formBuilder.group({
      caption: ['', Validators.required],
      text: ['', Validators.required],
      uploadFiles: [new Array<ImageData>()],
      equipmentAttachmentIds: [new Array<number>()]
    });

    this.configStep1 = {
      clickable: true,
      maxFiles: 1,
      autoReset: null,
      errorReset: null,
      cancelReset: null,
      url: 'api/file/upload',
      headers: {
        Authorization: `Bearer ${this.currentUser.token}`
      },
      acceptedFiles: 'image/*',
      createImageThumbnails: true
    };

    this.configStep2 = {
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

    this.loadTree();
  }

  loadTree() {
    this.equipmentService.getTree().subscribe(res => {
      this.files = res.data;
    });
  }

  treeClick(param: any) {
    if (param) {
      this.selectedIds = param;
      this.step1Form.controls.equipmentIds.setValue(param);
    }
  }

  get step1() { return this.step1Form.controls; }
  get step2() { return this.step2Form.controls; }

  next() {

    if (this.stepper._currentIndex === 0) {
      this.subStepp1 = true;
      if (this.step1Form.invalid) {
        this.toastr.error(this.translate.instant('Issue.Step1ModelStateError'));
        this.stepper.to(this.stepper._currentIndex);
        return;
      }

      const addIssueModel = new AddIssueFormModel();
      addIssueModel.userId = this.step1Form.get('userId').value;
      addIssueModel.issueType = this.step1Form.get('issueType').value;
      addIssueModel.title = this.step1Form.get('title').value;
      addIssueModel.imageId = this.step1Form.get('imageId').value;
      addIssueModel.description = this.step1Form.get('description').value;
      addIssueModel.equipmentIds = this.step1Form.get('equipmentIds').value;

      this.issueService.addIssue(addIssueModel).subscribe((res: ServerResponseViewModel<number>) => {
        this.issueId = res.data;
        this.toastr.success(this.translate.instant('Issue.Step1Successfully'));

        // load EquipmentAttachment for Step 2
        const model = new EquipmentAttachmentUserFormModel();
        model.equipmentIds = addIssueModel.equipmentIds;
        this.equipmentService.getEquipmentAttachmentForUser(model)
          .subscribe((arg: ServerResponseViewModel<Array<EquipmentAttachmentViewModel>>) => {
            this.equipmentAttachments = arg.data;
          });

        this.stepper.next();
      }, error => {
        this.stepper.to(this.stepper._currentIndex);
      });
    } else if (this.stepper._currentIndex === 1) {
      this.subStepp2 = true;

      if (!this.issueId) {
        this.toastr.error(this.translate.instant('Issue.MustInsertStep1'));
        this.stepper.to(this.stepper._currentIndex + 1);
        return;
      }

      if (this.step2Form.invalid) {
        this.toastr.error(this.translate.instant('Issue.Step2ModelStateError'));
        this.stepper.to(this.stepper._currentIndex + 1);
        return;
      }

      const addIssueDetailModel = new AddIssueDetailFormModel();
      addIssueDetailModel.userId = this.currentUser.id;
      addIssueDetailModel.issueId = this.issueId;
      addIssueDetailModel.text = this.step2Form.get('text').value;
      addIssueDetailModel.caption = this.step2Form.get('caption').value;
      addIssueDetailModel.uploadFiles = (this.step2Form.get('uploadFiles').value as Array<ImageData>).map(x => x.id);

      const eqAttachmentIds = this.step2Form.get('equipmentAttachmentIds').value;
      addIssueDetailModel.equipmentAttachmentIds = eqAttachmentIds.map(item => item.equipmentAttachmentId);

      this.issueService.addIssueDetails(addIssueDetailModel).subscribe((res: ServerResponseViewModel<IssueDetailViewModel>) => {
        this.issueDetailsId = res.data.issueDetailId;
        this.toastr.success(this.translate.instant('Issue.Step2Successfully'));
        this.stepper.next();
      }, error => {
        this.stepper.to(this.stepper._currentIndex + 1);
      });
    }
  }

  public onUploadError(args: any): void {
    this.toastr.error('در هنگام باگذاری خطایی رخ داده است');
  }

  public onUploadSuccess(result: any, stp: number): void {
    if (result && result.length > 0) {
      if (result[1].data !== '') {
        if (stp === 1) {
          this.step1Form.controls.imageId.setValue(result[1].data);
        } else {
          const fileIds = this.step2Form.get('uploadFiles').value as Array<ImageData>;
          fileIds.push({ id: result[1].data, uuid: result[0].upload.uuid });
          this.step2Form.controls.uploadFiles.setValue(fileIds);
        }
      }
    }
  }

  onRemoveFile(result: any) {
    const fileList = this.step2Form.get('uploadFiles').value as Array<ImageData>;
    const index = fileList.findIndex(x => x.uuid === result.upload.uuid);
    fileList.splice(index, 1);
    this.step2Form.controls.uploadFiles.setValue(fileList);
  }

  activeIssue() {
    if (this.step1Form.valid && this.step2Form.valid) {
      if (this.issueId && this.issueDetailsId) {
        const activateIssueModel = new ActivateIssueFormModel();
        activateIssueModel.issueId = this.issueId;
        activateIssueModel.isActive = true;
        this.loading = true;
        this.issueService.activateIssue(activateIssueModel).subscribe((res: ServerResponseViewModel<boolean>) => {
          this.loading = false;
          this.toastr.success(this.translate.instant('Issue.Compeleted'));
          this.router.navigate(['issue']);
        }, error => {
          this.loading = false;
        });
      } else {
        this.toastr.error(this.translate.instant('Issue.NotInsert'));
      }
    } else {
      this.toastr.error(this.translate.instant('Issue.retryCheck'));
    }
  }

  resetUploader() {
    this.drpzone.directiveRef.reset();
  }

  removeImage() {
    this.step1Form.controls.imageId.setValue('');
  }

  delete() {

    const deleteModel = new DeleteIssueFormModel();
    deleteModel.userId = this.currentUser.id;
    deleteModel.issueId = this.issueId;

    this.issueService.deleteIssue(deleteModel).subscribe((res: ServerResponseViewModel<boolean>) => {

    });
  }
}
