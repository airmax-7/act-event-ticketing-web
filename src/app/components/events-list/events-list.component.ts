import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Role } from 'src/app/common/enums/role.enum';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { EventService } from 'src/app/common/services/event.service';
import { Event } from 'src/app/common/models/event.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit{
  @Input() events: Event[] | undefined;
  @Output() openDetailsEventEmitter = new EventEmitter<Event>();

  selectedEvent: Event | undefined;
  filteredEvents : Event[] | undefined;

  filter = new FormControl('', {nonNullable: true});

  posterImageBaseUrl = environment.apiUrl + '/assets/event-posters/';

  constructor(
    private authenticationService: AuthenticationService,
    private eventService: EventService
  ) {  }

  async ngOnInit() {
    
    this.filteredEvents = this.events;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.events = changes['events'].currentValue;

    // this.filteredEvents = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => this.search(text, this.events))
    // );
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

  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredEvents = this.events?.filter(event => event.name.toLowerCase().includes(filterValue));
  }

  selectEvent(selectedEvent: Event){
    this.openDetailsEventEmitter.emit(selectedEvent);
  }

}
