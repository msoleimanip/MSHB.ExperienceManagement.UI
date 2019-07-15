import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  hamedList = [1, 2, 3, 4, 5, 6, 7, 8];

  searchContent = '';

  constructor(public translate: TranslateService, private router: Router) {
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



