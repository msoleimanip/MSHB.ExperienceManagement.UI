import { ActivateIssueFormModel } from 'src/app/dataModels/apiModels/activateIssueFormModel';
import { environment } from 'src/environments/environment.prod';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { IssueService } from 'src/app/core/issue.service';

@Component({
  selector: 'app-issue-change',
  templateUrl: './issue-change.component.html',
  styleUrls: ['./issue-change.component.css']
})
export class IssueChangeComponent implements OnInit {

  loading = false;
  hasChange = false;
  @Input() isuueId: number;
  @Input() isActive: boolean;

  constructor(public activeModal: NgbActiveModal,
    private issueService: IssueService,
    private toastr: ToastrService,
    public translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true;

    const activateIssueModel = new ActivateIssueFormModel();
    activateIssueModel.isActive = !this.isActive;
    activateIssueModel.issueId = this.isuueId;

    this.issueService.activateIssue(activateIssueModel).subscribe(res => {
      this.toastr.success(this.translate.instant('Issue.ChangeSuccessfully'));
      this.loading = false;
      this.hasChange = true;
      this.close();
    }, error => {
      this.loading = false;
    });
  }

  close() {
    this.activeModal.close(this.hasChange);
  }

}
