import { environment } from './../../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-issue-add',
  templateUrl: './issue-add.component.html',
  styleUrls: ['./issue-add.component.css']
})
export class IssueAddComponent implements OnInit {

  private stepper: Stepper;
  submitted = false;
  reloadIssues = false;
  loading = false;

  constructor(private toastr: ToastrService, private translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#issueStepper'), {
      linear: false,
      animation: true
    });
  }

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

}
