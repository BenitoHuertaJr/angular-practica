import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  protected url = environment.apiBaseUrl;

  constructor(
    private storage: StorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(Promise.resolve(this.storage.get('token')))
      .pipe(
        switchMap((token) => {
          
          if (token && token != '') {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
          }

          if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
          }

          Swal.fire({
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            showDenyButton: false,
            showCancelButton: false,
            timer: 2000,
            background: 'transparent',
            willOpen: () => {
              Swal.showLoading();
            }
          });

          return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              if (event instanceof HttpResponse) {
                // do nothing for now
              }
              return event;
            }),
            catchError((error: HttpErrorResponse) => {

              let message = this.getErrorsValidationMessage(error);
              this.presentAlert(message);
              return throwError(() => new Error(message));

            }),
            finalize(() => {
              Swal.close();
            })
          );
        })
      );
  }

  async presentAlert(message: string) {
    alert(message);
  }

  getErrorsValidationMessage(res: HttpErrorResponse): any {

    let defaultMessage = 'Hubo un error en el servidor';

    if (!res)
      return defaultMessage;

    if (!res.error)
      return defaultMessage;

    if (!res.error && !res.error.message)
      return defaultMessage;

    if (res.error.message != 'The given data was invalid.')
      return res.error.error ? res.error.error : JSON.stringify(res.error);

    if (res.error.message == 'The given data was invalid.') {

      let message = '';

      if (res.error.errors.constructor.name != "Object")
        return res.error.message;

      let obj = res.error.errors;

      Object.keys(obj).forEach(key => {

        if (Array.isArray(obj[key])) {

          message += '<ul class="alert-error-list">';

          let errors = obj[key];

          errors.forEach((det: string) => {
            message += '<li>' + det + '</li>';
          });

          message += '</ul>';

        } else {
          return res.error.message;
        }

      });

      return message;
    }
  }
}