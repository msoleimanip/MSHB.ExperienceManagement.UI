import { EditEquipmentAttachmentFormModel } from './../../../dataModels/apiModels/editEquipmentAttachmentFormModel';
import { AuthenticationService } from './../../../core/authentication.service';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentService } from './../../../core/equipment.service';
import { environment } from './../../../../environments/environment.prod';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/dataModels/viewModels/user';

@Component({
  selector: 'app-equipment-attachment',
  templateUrl: './equipment-attachment.component.html',
  styleUrls: ['./equipment-attachment.component.css']
})
export class EquipmentAttachmentComponent implements OnInit {

  @Input() attachment: EditEquipmentAttachmentFormModel;
  @Input() equipmentAttachmentTypesSelect: any;
  @Input() parentsTitle: string;
  public config: DropzoneConfigInterface;
  addForm: FormGroup;
  submitted = false;
  reloadTable = false;
  loading = false;
  currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private equipmentService: EquipmentService,
    private toastr: ToastrService,
    public translate: TranslateService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang(environment.language);
  }


  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      equipmentAttachmentName: [this.attachment.equipmentAttachmentName, Validators.required],
      equipmentAttachmentType: [this.attachment.equipmentAttachmentType, Validators.required],
      description: [this.attachment.description],
      uploadFileId: [this.attachment.uploadFileId]
    });

    this.config = {
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
  }

  get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.addForm.invalid) {
      this.toastr.error(this.translate.instant('General.ModelStateError'));
      this.loading = false;
      return;
    }

    this.attachment.equipmentAttachmentName = this.addForm.get('equipmentAttachmentName').value;
    this.attachment.equipmentAttachmentType = this.addForm.get('equipmentAttachmentType').value;
    this.attachment.uploadFileId = this.addForm.get('uploadFileId').value;
    this.attachment.description = this.addForm.get('description').value;

    this.loading = true;

    if (this.attachment.equipmentAttachmentId === undefined) {
      this.equipmentService.addEquipmentAttachment(this.attachment).subscribe(res => {
        this.loading = false;
        this.reloadTable = true;
        this.toastr.success(this.translate.instant('General.AddSuccessfully'));
        this.addForm.reset();
        this.submitted = false;
      }, error => {
        this.loading = false;
      });
    } else {
      this.equipmentService.editEquipmentAttachment(this.attachment).subscribe(res => {
        this.loading = false;
        this.reloadTable = true;
        this.toastr.success(this.translate.instant('General.AddSuccessfully'));
        this.close();
      }, error => {
        this.loading = false;
      });
    }
  }

  close() {
    this.activeModal.close(this.reloadTable);
  }

  public onUploadError(args: any): void {
    this.toastr.error(this.translate.instant('General.UploadError'));
  }

  public onUploadSuccess(result: any): void {
    if (result && result.length > 0) {
      if (result[1].data !== '') {
        this.addForm.controls.uploadFileId.setValue(result[1].data);
      }
    }
  }

  removeImage() {
    this.addForm.controls.uploadFileId.setValue('');
  }

}
