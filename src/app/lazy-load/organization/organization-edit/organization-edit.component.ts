import { EditOrgFormModel } from './../../../dataModels/apiModels/editOrgFormModel';
import { environment } from './../../../../environments/environment';
import { OrganizationService } from 'src/app/core/organization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.css']
})
export class OrganizationEditComponent implements OnInit {

  @Input() organization: EditOrgFormModel;
  @Input() parentsTitle: string;

  editForm: FormGroup;
  submitted = false;
  reloadTree = false;
  loading = false;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private organizationService: OrganizationService,
              private toastr: ToastrService,
              public translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      organizationName: [this.organization.organizationName, Validators.required],
      description: [this.organization.description]
    });
  }

  get f() { return this.editForm.controls; }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.editForm.invalid) {
      this.toastr.error(this.translate.instant('Organization.ModelStateError'));
      this.loading = false;
      return;
    }

    this.organization.organizationName = this.editForm.get('organizationName').value;
    this.organization.description = this.editForm.get('description').value;

    this.organizationService.edit(this.organization).subscribe(res => {
      if (res.data) {
        this.toastr.success(this.translate.instant('Organization.EditSuccessfully'), this.organization.organizationId.toString());
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
