import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthQuery } from '@ekhmoi/angular-sdk';
import { first, mergeMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authQuery: AuthQuery) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authQuery.token$.pipe(
      first(),
      mergeMap((token) => {
        const authReq = !!token
          ? req.clone({
              setHeaders: { Authorization: 'Bearer ' + token },
            })
          : req;
        return next.handle(authReq);
      })
    );
  }
}
