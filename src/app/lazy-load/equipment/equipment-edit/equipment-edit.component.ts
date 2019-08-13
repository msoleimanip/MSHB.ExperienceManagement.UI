import { EditEquipmentFormModel } from './../../../dataModels/apiModels/editEquipmentFormModel';
import { environment } from './../../../../environments/environment';
import { EquipmentService } from 'src/app/core/equipment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.css']
})
export class EquipmentEditComponent implements OnInit {

  @Input() equipment: EditEquipmentFormModel;
  @Input() parentsTitle: string;

  editForm: FormGroup;
  submitted = false;
  reloadTree = false;
  loading = false;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private equipmentService: EquipmentService,
              private toastr: ToastrService,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      equipmentName: [this.equipment.equipmentName, Validators.required],
      description: [this.equipment.description]
    });
  }

  get f() { return this.editForm.controls; }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.editForm.invalid) {
      this.toastr.error(this.translate.instant('Equipment.ModelStateError'));
      this.loading = false;
      return;
    }

    this.equipment.equipmentName = this.editForm.get('equipmentName').value;
    this.equipment.description = this.editForm.get('description').value;

    this.equipmentService.edit(this.equipment).subscribe(res => {
      if (res.data) {
        this.toastr.success(this.translate.instant('Equipment.EditSuccessfully'));
        this.reloadTree = true;
        this.close();
      }
    }, err => {
      this.loading = false;
    });
  }

  close() {
    this.activeModal.close(this.reloadTree);
  }

}
