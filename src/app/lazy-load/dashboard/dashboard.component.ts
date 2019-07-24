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

  hamedList= [1,2,3];
  issueViewModel = new Array<IssueViewModel>();
  issueLikesViewModel = new Array<IssueViewModel>();
  searchContent = '';
  currentUser: User;
  issueType = IssueType;
  
  constructor(private authenticationService: AuthenticationService,public translate: TranslateService,private issueService: IssueService, 
    private persianDatePickerHelper: PersianDatePickerHelper,
    private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang(environment.language);
    this.issueService.getUserIssueDashboard().subscribe(res => {
      this.issueViewModel = res.data;
    });
    this.issueService.getUserLikesDashboard().subscribe(res => {
      this.issueLikesViewModel = res.data;
    });

  }
  timeConvert(time: string) {
    return this.persianDatePickerHelper.getDatePer(this.persianDatePickerHelper.setDate(time, false))
      + ' ' + new Date(time).toLocaleTimeString();
  }
  ngOnInit() {

  }


  search() {
    if (this.searchContent === '') {
      this.router.navigate(['issue/search']);
    } else {
      this.router.navigate(['issue/search', this.searchContent]);
    }
  }

}



