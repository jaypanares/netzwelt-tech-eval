import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SignInRequest, UserData } from '../models';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userData$ = new BehaviorSubject<null | UserData>(null);
  loginError$ = new BehaviorSubject<null | { message: string }>(null);
  isAuthenticating$ = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) {}

  requestSignIn(requestBody: SignInRequest) {
    const url = `${environment.apiUrl}/Account/SignIn`;

    this.loginError$.next(null);

    this.http
      .post(
        `${
          environment.production
            ? environment.proxyUrl + encodeURIComponent(url)
            : url
        }`,
        requestBody
      )
      .subscribe({
        next: (data) => {
          const userData = data as UserData;
          this.userData$.next(userData);
          this.router.navigate(['home']);
          this.isAuthenticating$.next(false);
          this.sessionService.setSession(userData);
        },
        error: ({ error }) => {
          this.loginError$.next(error);
          this.isAuthenticating$.next(false);
        },
      });
  }

  logOut() {
    this.userData$.next(null);
    this.sessionService.clearSession();
    this.router.navigate(['login']);
  }

  isLoggedIn() {
    return this.userData$.value || this.sessionService.getSession();
  }
}
