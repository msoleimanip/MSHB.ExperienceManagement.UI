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

  searchText = '';

  constructor(public translate: TranslateService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {

  }


  search() {

  }

}



