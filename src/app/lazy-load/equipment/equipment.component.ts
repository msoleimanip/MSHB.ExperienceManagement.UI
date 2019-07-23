import { EditEquipmentAttachmentFormModel } from './../../dataModels/apiModels/editEquipmentAttachmentFormModel';
import { EquipmentAttachmentViewModel } from './../../dataModels/viewModels/equipmentAttachmentViewModel';
import { EquipmentAttachmentType } from './../../dataModels/enums/equipmentAttachmentType';
import { AddEquipmentAttachmentFormModel } from './../../dataModels/apiModels/addEquipmentAttachmentFormModel';
import { EquipmentAttachmentComponent } from './equipment-attachment/equipment-attachment.component';
import { AddEquipmentFormModel } from './../../dataModels/apiModels/addEquipmentFormModel';
import { EquipmentViewModel } from './../../dataModels/viewModels/equipmentViewModel';
import { EditEquipmentFormModel } from './../../dataModels/apiModels/editEquipmentFormModel';
import { EquipmentCreateComponent } from './equipment-create/equipment-create.component';
import { environment } from './../../../environments/environment';
import { EquipmentEditComponent } from './equipment-edit/equipment-edit.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { EquipmentService } from '../../core/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})

export class EquipmentComponent implements OnInit, OnDestroy {
  files: any[];
  parentOrg = new EquipmentViewModel();

  equipmentAttachmentTypesSelect: any;
  equipmentAttachmentType = EquipmentAttachmentType;
  attachments: Array<EquipmentAttachmentViewModel>;

  constructor(
    private modalService: NgbModal,
    public translate: TranslateService,
    private equipmentService: EquipmentService,
    private toastr: ToastrService,
    private config: NgbModalConfig) {
    translate.setDefaultLang(environment.language);
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.equipmentAttachmentTypesSelect =
      Object.keys(EquipmentAttachmentType).filter(Number).map(key => ({ title: EquipmentAttachmentType[key], value: key }));
    this.loadTree();
  }

  ngOnDestroy(): void {
    this.config.backdrop = true;
    this.config.keyboard = true;
  }
  loadTree() {
    this.equipmentService.getTree().subscribe(res => {
      this.files = res.data;
    });
  }

  loadAttachment() {
    this.equipmentService.getEquipmentAttachmentByEquipmentId(this.parentOrg.id)
      .subscribe((res: ServerResponseViewModel<Array<EquipmentAttachmentViewModel>>) => {
        this.attachments = res.data;
      });
  }

  treeClick(param: any) {
    if (param.id && param.id !== 0) {
      this.parentOrg.equipmentName = param.parents;
      this.parentOrg.id = param.id;
      this.loadAttachment();
    }
  }

  edit() {
    if (this.parentOrg.id && this.parentOrg.id !== 0) {
      this.equipmentService.getEquipment(this.parentOrg.id).subscribe((res: ServerResponseViewModel<EquipmentViewModel>) => {

        let editModel = new EditEquipmentFormModel();
        editModel.EquipmentId = res.data.id;
        editModel.equipmentName = res.data.equipmentName;
        editModel.description = res.data.description;
        editModel.parentId = res.data.parentId;

        let modalRef = this.modalService.open(EquipmentEditComponent, { windowClass: '.my-modal', size: 'lg' });
        modalRef.componentInstance.equipment = editModel;
        modalRef.componentInstance.parentsTitle = this.parentOrg.equipmentName;
        modalRef.result.then(result => {
          if (result === true) {
            this.loadTree();
          }
        });
      });
    } else {
      this.toastr.error(this.translate.instant('Equipment.TreeNotSelectedError'));
    }
  }

  create() {
    if (this.parentOrg.id && this.parentOrg.id !== 0) {
      let modalRef = this.modalService.open(EquipmentCreateComponent, { windowClass: '.my-modal', size: 'lg' });
      modalRef.componentInstance.parentsTitle = this.parentOrg.equipmentName;
      let equipment = new AddEquipmentFormModel();
      equipment.parentId = this.parentOrg.id;
      modalRef.componentInstance.equipment = equipment;
      modalRef.result.then(result => {
        if (result === true) {
          this.loadTree();
        }
      });
    } else {
      this.toastr.error(this.translate.instant('Equipment.TreeNotSelectedError'));
    }
  }

  addAttachment() {
    if (this.parentOrg.id && this.parentOrg.id !== 0) {
      const modalRef = this.modalService.open(EquipmentAttachmentComponent, { windowClass: '.my-modal', size: 'lg' });
      modalRef.componentInstance.parentsTitle = this.parentOrg.equipmentName;
      const attachment = new EditEquipmentAttachmentFormModel();
      attachment.equipmentId = this.parentOrg.id;
      modalRef.componentInstance.attachment = attachment;
      modalRef.componentInstance.parentsTitle = this.parentOrg.equipmentName;
      modalRef.componentInstance.equipmentAttachmentTypesSelect = this.equipmentAttachmentTypesSelect;
      modalRef.result.then(result => {
        if (result === true) {
          this.loadAttachment();
        }
      });
    } else {
      this.toastr.error(this.translate.instant('Equipment.TreeNotSelectedError'));
    }
  }

  editAttachment(attachmentId: number) {
    if (this.parentOrg.id && this.parentOrg.id !== 0) {
      this.equipmentService.getEquipmentAttachment(attachmentId).subscribe((res: ServerResponseViewModel<EquipmentAttachmentViewModel>) => {

        const modalRef = this.modalService.open(EquipmentAttachmentComponent, { windowClass: '.my-modal', size: 'lg' });
        modalRef.componentInstance.parentsTitle = this.parentOrg.equipmentName;
        const attachment = new EditEquipmentAttachmentFormModel();
        attachment.equipmentId = this.parentOrg.id;
        attachment.description = res.data.description;
        attachment.equipmentAttachmentName = res.data.equipmentAttachmentName;
        attachment.equipmentAttachmentType = res.data.equipmentAttachmentType;
        attachment.equipmentAttachmentId = res.data.equipmentAttachmentId;
        attachment.uploadFileId = res.data.fileId;
        modalRef.componentInstance.attachment = attachment;
        modalRef.componentInstance.parentsTitle = this.parentOrg.equipmentName;
        modalRef.componentInstance.equipmentAttachmentTypesSelect = this.equipmentAttachmentTypesSelect;
        modalRef.result.then(result => {
          if (result === true) {
            // this.loadAttachment();
          }
        });
      });
    } else {
      this.toastr.error(this.translate.instant('Equipment.TreeNotSelectedError'));
    }
  }

}



