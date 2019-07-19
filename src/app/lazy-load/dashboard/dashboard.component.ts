import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';
import { User } from 'src/app/dataModels/viewModels/user';
import { AuthenticationService } from 'src/app/core/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  hamedList = [1, 2, 3, 4, 5, 6, 7, 8];

  searchContent = '';
  currentUser: User;
  
  constructor(private authenticationService: AuthenticationService,public translate: TranslateService, private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    translate.setDefaultLang(environment.language);
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



