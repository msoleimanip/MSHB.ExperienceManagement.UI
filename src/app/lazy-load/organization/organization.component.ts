import { OrganizationCreateComponent } from './organization-create/organization-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { delay } from 'q';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})

export class OrganizationComponent implements OnInit {
  files: any[];

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  treeSelectedChange(param: any) {
    console.log(param);
  }

  open(param: any) {
    const modalRef = this.modalService.open(OrganizationCreateComponent, { windowClass: '.my-modal' });
    modalRef.componentInstance.name = 'World';
  }

  change() {
    this.files = [
      { "id": "1", "text": "کل موارد", "state": { "opened": false, "disabled": false, "selected": false }, "children": [{ "id": "2", "text": "رده اول", "state": { "opened": false, "disabled": false, "selected": false }, "children": [{ "id": "5", "text": "سازمان اول", "state": { "opened": false, "disabled": false, "selected": false }, "children": [], "li_attr": { "aria_selected": false }, "a_attr": {} }, { "id": "6", "text": "سازمان دوم", "state": { "opened": false, "disabled": false, "selected": false }, "children": [], "li_attr": { "aria_selected": false }, "a_attr": {} }], "li_attr": { "aria_selected": false }, "a_attr": {} }, { "id": "3", "text": "رده دوم", "state": { "opened": false, "disabled": false, "selected": false }, "children": [{ "id": "7", "text": "سازمان سوم", "state": { "opened": false, "disabled": false, "selected": false }, "children": [], "li_attr": { "aria_selected": false }, "a_attr": {} }, { "id": "8", "text": "سازمان چهارم", "state": { "opened": false, "disabled": false, "selected": false }, "children": [], "li_attr": { "aria_selected": false }, "a_attr": {} }], "li_attr": { "aria_selected": false }, "a_attr": {} }, { "id": "4", "text": "رده سوم", "state": { "opened": false, "disabled": false, "selected": false }, "children": [{ "id": "9", "text": "سازمان پنجم", "state": { "opened": false, "disabled": false, "selected": false }, "children": [], "li_attr": { "aria_selected": false }, "a_attr": {} }], "li_attr": { "aria_selected": false }, "a_attr": {} }], "li_attr": { "aria_selected": false }, "a_attr": {} }
    ];
  }

}



