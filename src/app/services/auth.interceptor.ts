import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthToken, selectIsLoggedIn } from '../reducers';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isLoggedIn: boolean;
  token: string;
  constructor(store: Store<AppState>) {
    store.select(selectIsLoggedIn).subscribe((on) => this.isLoggedIn = on);
    store.select(selectAuthToken).subscribe(token => this.token = token);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if the url is for the api and NOT for the authURL (auth/login) and they are logged in.
    if (req.url !== environment.apiUrl + 'auth/token' && this.isLoggedIn && req.url.startsWith(environment.apiUrl)) {
      // then attach a new authorization header with the bearer token from the store to the request.
      const newHeaders = req.headers.append('Authorization', 'Bearer' + this.token);
      const authRequest = req.clone({ headers: newHeaders });
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }

}
