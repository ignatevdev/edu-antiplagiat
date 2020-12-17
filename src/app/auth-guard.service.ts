import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { NbAuthService, NbAuthSimpleToken } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';

import { format as formatUrl } from 'url';
import { Observable, BehaviorSubject, of, merge } from 'rxjs';
import { catchError, filter, tap, map, switchMap } from 'rxjs/operators';
import { reduceTicks } from '@swimlane/ngx-charts';

import { environment } from './../environments/environment';

interface User {
  email: string;
  first_name: string;
  last_name: string;
}

interface Payload {
  data: User;
}

interface State {
  authAttempted: boolean;
  user: User;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: NbAuthService,
    private router: Router,
    private http: HttpClient,
  ) {
    this.authService
      .onTokenChange()
      .pipe(
        switchMap((token: NbAuthSimpleToken) => {
          const value = token.getValue();

          if (value) {
            return this.loadUser();
          }

          return of(null);
        }),
        catchError(() => {
          return of(null);
        }),
      )
      .pipe(
        tap(user => {
          this.state.next({
            authAttempted: true,
            user,
          });
        }),
      )
      .subscribe();
  }

  state = new BehaviorSubject<State>({
    authAttempted: false,
    user: null,
  });

  canActivate(route: ActivatedRouteSnapshot) {
    const { authorizedOnly, unauthorizedOnly } = route.data;

    const loginRedirect = this.router.parseUrl('/auth/login');
    const homeRedirect = this.router.parseUrl('/');

    return this.state.pipe(filter(state => state.authAttempted)).pipe(
      map(({ user }) => {
        if (authorizedOnly && !user) {
          return loginRedirect;
        }

        if (unauthorizedOnly && user) {
          return homeRedirect;
        }

        return true;
      }),
    );
  }

  getUser(): User {
    return this.state.value.user;
  }

  loadUser() {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: '/lk/profile',
    });

    return this.http.get(formattedUrl).pipe(
      map((payload: Payload) => {
        const user = payload.data;

        return user;
      }),
    );
  }

  updateUser(data) {
    const formattedUrl = formatUrl({
      ...environment.api,
      pathname: '/lk/profile',
    });

    return this.http.patch(formattedUrl, data).pipe(
      tap((payload: Payload) => {
        const user = payload.data;

        this.state.next({
          ...this.state.getValue(),
          user,
        });
      }),
    );
  }
}
