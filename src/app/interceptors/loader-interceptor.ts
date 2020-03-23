import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { finalize, delay } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loaderServide: LoaderService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderServide.show();
        return next.handle(req)
            .pipe(
                finalize(() => this.loaderServide.hide()));
    }
};