import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class FetchingService {
  constructor(private http: HttpClient, private cookies: CookieService) {}

  getData = (url: string) => {
    return this.http.get(url);
  };
  postMethod = (url: string, body?: any) => {
    const token = this.cookies.get('token');
    return this.http.post(url, body, {
      headers: { Accept: 'application/json' },
    });
  };
}
