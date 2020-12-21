import { Inject, Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  NbAuthService,
  NB_AUTH_INTERCEPTOR_HEADER,
  NbAuthSimpleToken,
} from '@nebular/auth';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    @Inject(NB_AUTH_INTERCEPTOR_HEADER)
    protected headerName: string = 'Authorization',
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.authService.getToken().pipe(
      switchMap((token: NbAuthSimpleToken) => {
        if (token && token.getValue()) {
          req = req.clone({
            setHeaders: {
              [this.headerName]: `Bearer ${token.getValue()}`,
            },
          });
        }
        return next.handle(req);
      }),
    );
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }
}
