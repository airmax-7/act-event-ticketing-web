import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "./../../../environments/environment";

@Injectable({
    providedIn: 'root',
  })
  export class EventClient {
    constructor(private http: HttpClient) {}
  
    getEvents(): Observable<any> {
      return this.http.get(environment.apiUrl + '/event');
    }
  }