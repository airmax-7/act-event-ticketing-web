import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventClient } from 'src/app/common/clients/eventClient';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

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

  logout(): void {
    this.authenticationService.logout();
  }
}
