import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISubscribe } from '../models/subscribe.model';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  getPackage(): Observable<ISubscribe[]> {
    return this.http.get<ISubscribe[]>(
      `${environment.api_server}/api/rules-subscription`
    );
  }
}
