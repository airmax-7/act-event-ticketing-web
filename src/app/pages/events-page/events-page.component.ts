import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import {Role} from 'src/app/common/enums/role.enum'
import { EventService } from 'src/app/common/services/event.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Event } from 'src/app/common/models/event.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit{
  events: Event[] | undefined;
  selectedEvent: Event | undefined;
  filteredEvents : Observable<Event[] | undefined> | undefined;

  filter = new FormControl('', {nonNullable: true});
  detailsMode = false;

  constructor(
    private authenticationService: AuthenticationService,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {  }

  async ngOnInit() {
    this.events = await this.eventService.getEvents();
    if (this.router.url.includes('details')) {
      this.route.queryParams.subscribe(params => {
        this.selectedEvent = this.events?.find(event => event.eventCode.toString() === params['eventCode']);
        if (this.selectedEvent) {
          this.detailsMode = true;
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.events = changes['events'].currentValue;

    this.filteredEvents = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, this.events))
    );
  }

  openDetails(selectedEvent: Event) {
    this.router.navigate(['events/details'], { queryParams: { eventCode: selectedEvent.eventCode } });
  }

  search(text: string, events: Event[] | undefined): Event[] | undefined {
    if (!events) {
      return;
    }

    return events.filter(e => {
      const term = text.toLowerCase();
      return e.name.toLowerCase().includes(term)
          || e.venue.toLowerCase().includes(term);
    });
  }

  isAdmin(): boolean {
    const user = this.authenticationService.getUser();
    return user !== null && user.roles.indexOf(Role.Admin) !== -1;
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
