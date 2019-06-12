import { environment } from './../../../../environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { OrganizationDto } from 'src/app/dataModels/organizationDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from 'src/app/core/organization.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css']
})
export class OrganizationCreateComponent implements OnInit {

  organization: OrganizationDto;
  @Input() parentsTitle: string;
  createForm: FormGroup;
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
    this.createForm = this.formBuilder.group({
      organizationName: ['', Validators.required],
      description: ['']
    });
  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.createForm.invalid) {
      this.toastr.error(this.translate.instant('Organization.ModelStateError'));
      this.loading = false;
      return;
    }

    this.organization.organizationName = this.createForm.get('organizationName').value;
    this.organization.description = this.createForm.get('description').value;

    this.organizationService.add(this.organization).subscribe(res => {
      if (res.data) {
        this.toastr.success(this.translate.instant('Organization.AddSuccessfully'), res.data);
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
