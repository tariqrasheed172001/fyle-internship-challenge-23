import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  // This class implements the HttpInterceptor interface to intercept HTTP requests and responses

  // Intercept HTTP requests
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request method is not GET
    if (request.method !== 'GET') {
      // If not GET, continue with the request without caching
      return next.handle(request);
    }

    // Check if the response is cached in localStorage
    const cachedResponse = localStorage.getItem(request.url);
    if (cachedResponse) {
      // If cached, return the cached response
      return of(new HttpResponse({ body: JSON.parse(cachedResponse) }));
    }

    // If not cached, make the request and cache the response
    return next.handle(request).pipe(
      tap((event) => {
        // Check if the event is an HTTP response
        if (event instanceof HttpResponse) {
          // Cache the response in localStorage with expiration time
          localStorage.setItem(request.url, JSON.stringify(event.body));
        }
      })
    );
  }
}
