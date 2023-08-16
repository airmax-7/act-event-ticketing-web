import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventClient } from 'src/app/common/clients/eventClient';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import {Role} from 'src/app/common/enums/role.enum'

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit{
  public events: Observable<any> = this.eventClient.getEvents();
  
  constructor(
    private authenticationService: AuthenticationService,
    private eventClient: EventClient
  ) {}

  ngOnInit(): void {}

  isAdmin(): boolean {
    const user = this.authenticationService.getUser();
    return user !== null && user.roles.indexOf(Role.Admin) !== -1;
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
