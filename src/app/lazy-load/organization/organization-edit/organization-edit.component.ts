import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { OrganizationDto } from 'src/app/dataModels/organizationDto';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.css']
})
export class OrganizationEditComponent implements OnInit {

  @Input() organization: OrganizationDto;
  @Input() parentsTitle: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    console.log(this.organization);
  }

}
