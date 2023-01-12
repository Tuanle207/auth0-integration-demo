import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/core/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class BearerInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.accessToken$.pipe(switchMap(
      (token) => {
        req.headers.set('Bearer', token || '');
        console.log('attach bearer token to header')
        return next.handle(req.clone({
          setHeaders: {
            Authorization: `Basic ${token}`
          }
        }));
      }
    ))
  }
}