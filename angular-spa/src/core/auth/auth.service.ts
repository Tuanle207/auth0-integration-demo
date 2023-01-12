import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0Client, createAuth0Client, User } from '@auth0/auth0-spa-js';
import { BehaviorSubject, combineLatest, from, Observable, of, shareReplay, Subject, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  auth0$ = from(createAuth0Client({
    domain: 'dev-5dygevwayb2zd4vp.us.auth0.com',
    clientId: 'oj9Kcy7D5QNYAHMEVlXbvUbTed7spztc',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'https:localhost:5000'
    },
  })).pipe(shareReplay(1));
  private auth0!: Auth0Client;
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private _user$ = new BehaviorSubject<User | undefined>(undefined);
  private _accessToken$ = new BehaviorSubject<string | undefined>(undefined);
  
  isAuthenticated$ = this._isAuthenticated$.asObservable();
  user$ = this._user$.asObservable();
  accessToken$ = this._accessToken$.asObservable();

  constructor(private router: Router) {
    this.initSession();
    this.handleRedirectCallback();
  }

  login(): Observable<void> {
    return this.auth0$.pipe(
      switchMap((auth0) => from(auth0.loginWithRedirect()))
    );
    // return from(this.auth0.loginWithRedirect());
  }

  logout(): Observable<void> {
    return this.auth0$.pipe(
      switchMap((auth0) => from(auth0.logout()))
    );
    // return from(this.auth0.logout());
  }

  getAccessToken(): Observable<string> {
    // return this.auth0$.pipe(
    //   switchMap((auth0) => from(auth0.getTokenSilently()))
    // );
    return from(this.auth0.getTokenSilently());
  }

  initAuth0Client(): Observable<Auth0Client> {
    return from(createAuth0Client({
      domain: 'dev-5dygevwayb2zd4vp.us.auth0.com',
      clientId: 'oj9Kcy7D5QNYAHMEVlXbvUbTed7spztc',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })).pipe(
      shareReplay(1),
      tap((auth0) => {
        this.auth0 = auth0;
      })
    );
  }

  private initSession(): void {
    this.isAuthenticated().pipe(
      switchMap((authenticated) => combineLatest([
        of(authenticated), 
        authenticated ? this.getUser() : of(undefined),
        authenticated ? this.getAccessToken() : of(undefined)
      ]))
    ).subscribe(([isAuthenticated, user, token]) => {
      this._isAuthenticated$.next(isAuthenticated);
      this._user$.next(user);
      this._accessToken$.next(token);
    });
  }

  private handleRedirectCallback(): void {
    const query = window.location.search;
    const shouldIgnore = localStorage.getItem('SHOULD_IGNORE');
    const shouldParseResult = !shouldIgnore && query.includes("code=") && query.includes("state=");
    if (!shouldParseResult) {
      return;
    }

    this.auth0$.pipe(
      switchMap((auth0) => from(auth0.handleRedirectCallback()))
    ).pipe(
      tap((result) => {
        if (result.appState && result.appState.targetUrl) {
          console.log(result.appState.targetUrl);
        }
      }),
      switchMap(() => combineLatest([
        this.isAuthenticated(),
        this.getUser(),
        this.getAccessToken()
      ]))
    ).subscribe(([isAuthenticated, user, token]) => {
      this._isAuthenticated$.next(isAuthenticated);
      this._user$.next(user);
      this._accessToken$.next(token);
      this.router.navigateByUrl(this.cleanTargetRoute(query));
    });
  }

  private getUser(): Observable<User | undefined> {
    return this.auth0$.pipe(
      switchMap((auth0) => from(auth0.getUser()))
    );
    // return from(this.auth0.getUser());
  }

  private isAuthenticated(): Observable<boolean> {
    return this.auth0$.pipe(
      switchMap((auth0) => from(auth0.isAuthenticated()))
    );
    // return from(this.auth0.isAuthenticated());
  }

  private cleanTargetRoute(route: string): string {
    const splittedRoute = route.split('?');
    const params = new URLSearchParams(splittedRoute[1]);
    params.delete('code');
    params.delete('state');
    return params.toString() ? `${splittedRoute[0]}?${params.toString()}` : splittedRoute[0];
  }
}