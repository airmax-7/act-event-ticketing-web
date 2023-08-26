import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/common/enums/role.enum';
import { User } from 'src/app/common/models/user.model';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedInUser: User | null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ){
    this.loggedInUser = this.authenticationService.getUser();
  }

  isLoggedIn(): boolean{
    return this.loggedInUser !== null;
  }

  isAdmin(): boolean {
    return this.loggedInUser !== null && this.loggedInUser.roles.indexOf(Role.Admin) !== -1;
  }

  login(): void{
    this.router.navigate(['/login']);
  }

  register():void{
    this.router.navigate(['/register']);
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
