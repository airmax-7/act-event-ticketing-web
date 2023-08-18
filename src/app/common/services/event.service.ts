import { Router } from "@angular/router";
import { EventClient } from "../clients/eventClient";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Event } from "../models/event.model";

@Injectable({
    providedIn: 'root',
})

export class EventService {
    events: Event[] | undefined;
    eventsPromise: Promise<Event[]> | undefined;

    constructor(
        private eventClient: EventClient,
        private router: Router,
        private snackBar: MatSnackBar) { }

    public getEvents(): Promise<Event[]> {
        if (this.eventsPromise) {
          return this.eventsPromise;
        }
  
        this.eventsPromise = new Promise<Event[]>((resolve, reject) => {
          if (this.events) {
            resolve(this.events);
          } else {
            this.eventClient
              .getEvents()
              .pipe(map((res) => res))
              .subscribe({
                next: (data) => {
                  this.events = [...data];
                  resolve(this.events);
                },
                error: (error) => {
                  //this.handleErrorService.handleError<Event[]>('getEvents', error);
                  reject(error);
                },
              })
          };
        });
  
        return this.eventsPromise;
    }

}