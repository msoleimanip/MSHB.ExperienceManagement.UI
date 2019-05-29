import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css']
})
export class OrganizationCreateComponent {

  @Input() name;

  constructor(public activeModal: NgbActiveModal) { }

}
