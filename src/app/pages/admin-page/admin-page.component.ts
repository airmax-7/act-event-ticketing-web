import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  constructor(
    private authenticationService : AuthenticationService
  ){}
  
  ngOnInit(): void {
  }

  logout(): void{
    this.authenticationService.logout();
  }

}
