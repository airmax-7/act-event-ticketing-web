import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "./../../../environments/environment";
import { Event } from "../models/event.model";


@Injectable({
    providedIn: 'root',
  })
  export class EventClient {
    constructor(private http: HttpClient) {}
  
    getEvents(): Observable<Event[]> {
      return this.http.get<Event[]>(environment.apiUrl + '/event/getall');
    }
  }