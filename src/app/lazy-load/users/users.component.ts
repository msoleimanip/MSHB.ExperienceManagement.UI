import { UserViewModel } from './../../dataModels/viewModels/userViewModel';
import { environment } from './../../../environments/environment';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from 'src/app/core/users.service';
import { ServerResponseViewModel } from 'src/app/dataModels/viewModels/serverResponseViewModel';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, OnDestroy {

  users: Array<UserViewModel>;

  constructor(public translate: TranslateService, private usersService: UsersService) {
    translate.setDefaultLang(environment.language);
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe((res: ServerResponseViewModel<Array<UserViewModel>>) => {
      this.users = res.data;
    });
  }

  ngOnDestroy(): void {
  }

  changePermission() {

  }

}



