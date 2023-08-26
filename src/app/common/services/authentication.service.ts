
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from '@angular/core'
import { Observable } from "rxjs";
import { AuthenticationClient } from '../clients/authenticationClient';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Result } from '../models/result.model';
import jwtDecode from "jwt-decode";
import { User } from '../models/user.model';
import { Claims } from '../enums/claims.enum';
import { LocalStorageConstants } from '../constants/constants';
import { ApplicationUser } from '../models/application-user.model';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  private tokenKey = 'token';
  private userKey = 'user';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  public login(username: string, password: string): void {
    this.authenticationClient.login(username, password)
      .subscribe({
        next: (result) => {
          this.handleSuccessAuthentication(result);
        },
        error: (error: HttpErrorResponse) => {
          this.handleFailedAuthentication(error);
        }
      })
  };

  public register(user: ApplicationUser): void {
    this.authenticationClient.register(user)
      .subscribe({
        next: (result) => {
          this.handleSuccessAuthentication(result);
        },
        error: (error: HttpErrorResponse) => {
          this.handleFailedAuthentication(error);
        }
      });
  };

  public logout() {
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    const user = this.getUser();
    if(user)
    {
      return user.token != null && user.token.length > 1;
    }
    return false;
  }

  public getToken(): string | null {
    const user = this.getUser();
    if(user){
      return user.token;
    }
    return null;
  }

  public getUser(): User | null{
    const userJson = localStorage.getItem(this.userKey);
    if(userJson){
      let user: User = JSON.parse(userJson);
      return user;
    }
    return null;
  }

  private handleSuccessAuthentication(result: Result<string>): void {
    let message;

    if (result !== null && result.isSuccess && result.response.length > 1) {
      const decodedToken = jwtDecode<any>(result.response);
      const user = new User(
        decodedToken[Claims.NameTokenKey],
        decodedToken[Claims.EmailTokenKey],
        decodedToken[Claims.RoleTokenKey],
        result.response
      )
      localStorage.setItem(this.userKey, JSON.stringify(user));

      var lastUrl = localStorage.getItem(LocalStorageConstants.lastVisitUrl);
      if(lastUrl){
        localStorage.removeItem(LocalStorageConstants.lastVisitUrl);
        var urlParts = lastUrl.split('?');
        this.router.navigate([urlParts[0]]);
      }
      else{
        this.router.navigate(['/']);
      }
      message = 'User has been authenticated.';
    } else if (result !== null && !result.isSuccess) {
      message = result.errors.join(' ');
    } else {
      message = 'Something went wrong.';
    }

    this.snackBar.open(message, 'Close');
  }

  private handleFailedAuthentication(error: HttpErrorResponse): void {
    let errorsMessage = [];

    let validationErrorDictionary = JSON.parse(JSON.stringify(error.error.errors));
    for (let fieldName in validationErrorDictionary) {
      if (validationErrorDictionary.hasOwnProperty(fieldName)) {
        errorsMessage.push(validationErrorDictionary[fieldName]);
      }
    }
    this.snackBar.open(errorsMessage.join(' '), 'Close');
  }
}