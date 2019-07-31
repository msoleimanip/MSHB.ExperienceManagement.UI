import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';
import { User } from 'src/app/dataModels/viewModels/user';
import { AuthenticationService } from 'src/app/core/authentication.service';
import { IssueViewModel } from 'src/app/dataModels/viewModels/issueViewModel';
import { IssueService } from 'src/app/core/issue.service';
import { PersianDatePickerHelper } from 'src/app/core/persianDatePickerHelper';
import { IssueType } from 'src/app/dataModels/enums/issueType';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  issueViewModel = new Array<IssueViewModel>();
  issueLikesViewModel = new Array<IssueViewModel>();
  searchContent = '';
  currentUser: User;
  issueType = IssueType;

  constructor(
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    private issueService: IssueService,
    private persianDatePickerHelper: PersianDatePickerHelper,
    private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang(environment.language);
  }

  timeConvert(time: string) {
    return this.persianDatePickerHelper.getDatePer(this.persianDatePickerHelper.setDate(time, false))
      + ' ' + new Date(time).toLocaleTimeString();
  }

  ngOnInit() {
    this.loadDashboardData();
  }


  search() {
    if (this.searchContent === '') {
      this.router.navigate(['issue/search']);
    } else {
      this.router.navigate(['issue/search', this.searchContent]);
    }
  }

  loadDashboardData() {
    if (this.currentUser) {
      this.issueService.getUserIssueDashboard().subscribe((res: ServerResponseViewModel<Array<IssueViewModel>>) => {
        this.issueViewModel = res.data;

        this.issueService.getUserLikesDashboard().subscribe((result: ServerResponseViewModel<Array<IssueViewModel>>) => {
          this.issueLikesViewModel = result.data;
        });

      });
    }
  }

}



