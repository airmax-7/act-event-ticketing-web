import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/common/services/event.service';
import { Event } from 'src/app/common/models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  events: Event[] | undefined;

  constructor(
    private eventService: EventService,
    private router: Router,
  ){}
  
  async ngOnInit() {
    this.events = await this.eventService.getEvents();
  }

  openDetails(selectedEvent: Event) {
    this.router.navigate(['events/details'], { queryParams: { eventCode: selectedEvent.eventCode } });
  }

}
