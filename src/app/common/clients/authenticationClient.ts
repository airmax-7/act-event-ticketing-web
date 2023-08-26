
import {environment} from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import {Injectable} from '@angular/core'
import { Observable } from "rxjs";
import { Result } from '../models/result.model';
import { User } from '../models/user.model';
import { ApplicationUser } from '../models/application-user.model';

@Injectable({
    providedIn: 'root',
})

export class AuthenticationClient{
    constructor(private http: HttpClient){}

    public login(username: string, password: string): Observable<Result<string>>{
        return this.http.post<Result<string>>(
            environment.apiUrl + '/user/login',
            {
                username: username,
                password: password,
            },
        );
    }

    public register(user: ApplicationUser
      ): Observable<Result<string>> {
        return this.http.post<Result<string>>(
          environment.apiUrl + '/user/register',
          user,
        );
      }
}