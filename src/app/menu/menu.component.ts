import { Component, OnInit } from '@angular/core';
import { User } from '../dataModels/user';
import { AuthenticationService } from '../core/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  currentUser: User;
  isExpanded = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

  }


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  get isAdmin() {    
    return this.currentUser && this.currentUser.role.includes('Admin');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}



