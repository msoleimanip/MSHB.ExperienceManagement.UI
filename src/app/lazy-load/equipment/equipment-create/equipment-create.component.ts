import { AddEquipmentFormModel } from './../../../dataModels/apiModels/addEquipmentFormModel';
import { environment } from './../../../../environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipmentService } from 'src/app/core/equipment.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-equipment-create',
  templateUrl: './equipment-create.component.html',
  styleUrls: ['./equipment-create.component.css']
})
export class EquipmentCreateComponent implements OnInit {

  equipment: AddEquipmentFormModel;
  @Input() parentsTitle: string;
  createForm: FormGroup;
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
    this.createForm = this.formBuilder.group({
      equipmentName: ['', Validators.required],
      description: ['']
    });
  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.createForm.invalid) {
      this.toastr.error(this.translate.instant('Equipment.ModelStateError'));
      this.loading = false;
      return;
    }

    this.equipment.equipmentName = this.createForm.get('equipmentName').value;
    this.equipment.description = this.createForm.get('description').value;

    this.equipmentService.add(this.equipment).subscribe(res => {
      if (res.data) {
        this.toastr.success(this.translate.instant('Equipment.AddSuccessfully'), res.data);
        this.reloadTree = true;

        this.submitted = false;
        this.loading = false;
        this.createForm.reset();
      }
    }, err => {
      this.loading = false;
    });
  }

  close() {
    this.activeModal.close(this.reloadTree);
  }

}
